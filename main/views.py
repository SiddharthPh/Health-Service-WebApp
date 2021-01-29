from django.shortcuts import render, HttpResponse
from accounts.models import Doctor,Patient
from .models import patient_profile, doctor_profile,Appointment,Medical_history
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from accounts.views import *
from json import dumps
import json
from random import randint, shuffle
from django.http import JsonResponse
from django.views.generic import TemplateView
from chartjs.views.lines import BaseLineChartView
from .colors import next_color
import pandas as pd

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from scipy import signal
from scipy.ndimage import label
from scipy.stats import zscore
from scipy.interpolate import interp1d
from scipy.integrate import trapz


import os
import csv
# import numpy as np
# import pandas as pd
import pickle
from collections import defaultdict
from sklearn.naive_bayes import MultinomialNB


df=pd.read_csv('/home/siddharth/Intern_winter/sdn/main/data.csv')
# patient_id=df['patient_id']
list_temp=[]
list_date=[]
list_bps=[]
list_bpd=[]
list_bmi=[]
list_sc=[]
list_rr=[]
list_pulse=[]
list_o2=[]
list_hb=[]
count=0
for temp in df['temp']:
    list_temp.append(temp)
    count=count+1
    if count==7:
        count=0
        break
for date in df['date']:
    list_date.append(date)
    count=count+1
    if count==7:
        count=0
        break
for bmi in df['bmi']:
    list_bmi.append(bmi)
    count=count+1
    if count==7:
        count=0
        break
for sc in df['sc']:
    list_sc.append(sc)
    count=count+1
    if count==7:
        count=0
        break
for pulse in df['pulse']:
    list_pulse.append(pulse)
    count=count+1
    if count==7:
        count=0
        break
for o2 in df['o2']:
    list_o2.append(o2)
    count=count+1
    if count==7:
        count=0
        break
for rr in df['rr']:
    list_rr.append(rr)
    count=count+1
    if count==7:
        count=0
        break
for hb in df['hb']:
    list_hb.append(hb)
    count=count+1
    if count==7:
        count=0
        break
for bps in df['bp(systolic)']:
    list_bps.append(bps)
    count=count+1
    if count==7:
        count=0
        break
for bpd in df['bp(diastolic)']:
    list_bpd.append(bpd)
    count=count+1
    if count==7:
        count=0
        break
# print(list_temp)
# Create your views here.
# @login_required(login_url='loginp')
def patient_home(request):
    doctors=Doctor.objects.all()
    patient_name=request.session.get('patient_name')
    patient_email=request.session.get('patient_email')
    patient_address=request.session.get('patient_address')
    patient_phone=request.session.get('patient_phone')
    patient_height=request.session.get('patient_height')
    patient_weight=request.session.get('patient_weight')
    patient_gender=request.session.get('patient_gender')
    patient_obj=Patient.objects.all().get(email=patient_email)
    if Medical_history.objects.all().filter(patient_obj=patient_obj):
        medical_history_obj=Medical_history.objects.all().get(patient_obj=patient_obj)
    else:
        medical_history_obj=None
    data = pd.read_excel('raw_data.xlsx')
    # print(data)
    data = data.fillna(method='ffill')
    print(data)
    def process_name(data):
        data_list = []
        data_name = data.replace('^','_').split('_')
        n = 1
        # print(data_name)
        for names in data_name:
            if n%2==0:
                data_list.append(names)
            n+=1
        # print(data_list)
        return data_list
    disease_list = []
    disease_symptom_dict = defaultdict(list)
    disease_symptom_count = {}
    count = 0

    for idx, row in data.iterrows():
        
        # Get the Disease Names
        if (row['Disease'] !="\xc2\xa0") and (row['Disease'] != ""):
            disease = row['Disease']
            # print(disease)
            disease_list = process_name(data=disease)
            # print(disease_list)
            count = row['Count of Disease Occurrence']
            # print(count)

        # Get the Symptoms Corresponding to Diseases
        if (row['Symptom'] !="\xc2\xa0") and (row['Symptom'] != ""):
            symptom = row['Symptom']
            symptom_list = process_name(data=symptom)
            for d in disease_list:
                for s in symptom_list:
                    disease_symptom_dict[d].append(s)
                disease_symptom_count[d] = count
    with open('dataset_clean.csv','w') as csvfile:
        writer = csv.writer(csvfile)
        for key, value in disease_symptom_dict.items():
            for v in value:
                key = str.encode(key).decode('utf-8')
                writer.writerow([key,v,disease_symptom_count[key]])
    columns = ['Source', 'Target', 'Weight']
    data = pd.read_csv('dataset_clean.csv', names=columns, encoding='ISO-8859-1')
    data.head()
    data.to_csv('dataset_clean.csv',index=False)
    unique_diseases = data['Source'].unique()
    print('No. of diseases:', len(unique_diseases))
    print('Disease:')
    for disease in unique_diseases:
        print(disease)
    unique_symptoms = data['Target'].unique()
    print('No. of symptoms',len(unique_symptoms))
    print('Symptoms:')
    for symptom in unique_symptoms:
        print(symptom)
    df_1 = pd.get_dummies(data.Target)
    print(df_1.head())
    df_s = data['Source']
    print(df_s.head())
    df_pivoted = pd.concat([df_s, df_1], axis=1)
    df_pivoted.drop_duplicates(keep='first',inplace=True)
    df_pivoted = df_pivoted.groupby('Source',sort=False).sum()
    df_pivoted = df_pivoted.reset_index()
    df_pivoted.head()
    df_pivoted.to_csv('df_pivoted.csv')
    x = df_pivoted[df_pivoted.columns[1:]]
    y = df_pivoted['Source']
    print(x[:5])
    print(y[:5])
    weights = np.fromiter(disease_symptom_count.values(), dtype=float)
    total=sum(weights)
    prob = weights/total
    print(prob)
    mnb_tot = MultinomialNB()
    mnb_tot = mnb_tot.fit(x, y)
    mnb_tot.score(x, y)
    disease_pred = mnb_tot.predict(x)
    disease_real = y.values
    for i in range(0, len(disease_real)):
        if disease_pred[i]!=disease_real[i]:
            print('Pred:',disease_pred[i])
            print('Actual:',disease_real[i])
            print('##########################')
    # Using class prior prob
    mnb_prob = MultinomialNB(class_prior=prob)
    mnb_prob = mnb_prob.fit(x, y)
    mnb_prob.score(x, y)
    disease_pred = mnb_prob.predict(x)
    for i in range(0, len(disease_real)):
        if disease_pred[i]!=disease_real[i]:
            print('Pred:',disease_pred[i])
            print('Actual:',disease_real[i])
            print('##########################')
    filename = 'NB_model.sav'
    pickle.dump(mnb_tot, open(filename, 'wb'))
    model = pickle.load(open(filename,'rb'))
    # model.predict([100*[1]+100*[0]+204*[0]])
    symptoms = df_pivoted.columns[1:].values
    print(symptoms)
    test_input = [0]*404
    # print(type(test_input))
    # user_symptoms = list(input().split(','))
    # print(type(user_symptoms))
    # for symptom in user_symptoms:
    #     test_input[np.where(symptoms==symptom)[0][0]] = 1
    # print(type(test_input))
    # print(test_input)
    # print('Most probable disease:',model.predict([test_input]))
    # print(type([test_input]))
    # unique_symptoms=unique_symptoms.tolist()
    # unique_diseases=unique_diseases.tolist()
    # unique_symptoms=json.dumps(unique_symptoms)
    context={
        'patient_name':patient_name,
        'patient_email':patient_email,
        'patient_address':patient_address,
        'patient_phone':patient_phone,
        'patient_height':patient_height,
        'patient_weight':patient_weight,
        'patient_gender':patient_gender,
        'doctors':doctors,
        'medical_history_obj':medical_history_obj,
        'symptoms':unique_symptoms,
        'date':list_date,
        'temp':list_temp,
        'bmi':list_bmi,
        'sc':list_sc,
        'pulse':list_pulse,
        'o2':list_o2,
        'rr':list_rr,
        'hb':list_hb,
        'bpd':list_bpd,
        'bps':list_bps,
    }
    return render(request,'main/patient_home.html',context)

def logout(request):
    messages.success(request,'Successfully, Loggedout')
    return redirect('home')

# @login_required(login_url='logind')
def doctor_home(request):
    doctor_name=request.session.get('doctor_name')
    doctor_email=request.session.get('doctor_email')
    doctor_address=request.session.get('doctor_address')
    doctor_phone=request.session.get('doctor_phone')
    if Appointment.objects.all().filter(doctor_mail=doctor_email):
        appointment_obj=Appointment.objects.all().filter(doctor_mail=doctor_email)
    else:
        appointment_obj=None
    patient_obj=Patient.objects.all()
    medical_history_obj=Medical_history.objects.all()
    context={
        'doctor_name':doctor_name,
        'doctor_email':doctor_email,
        'doctor_address':doctor_address,
        'doctor_phone':doctor_phone,
        'appointment_obj':appointment_obj,
        'patient_obj':patient_obj,
        'medical_history_obj':medical_history_obj,
        'date':list_date,
        'temp':list_temp,
        'bmi':list_bmi,
        'sc':list_sc,
        'pulse':list_pulse,
        'o2':list_o2,
        'rr':list_rr,
        'hb':list_hb,
        'bpd':list_bpd,
        'bps':list_bps,
    }
    return render(request,'main/doctor_home.html',context)

def appointment(request):
    fullName=request.POST['fullName']
    email=request.POST['email']
    time=request.POST['schedule_time']
    date=request.POST['schedule_date']
    doctor=request.POST['doctors']
    message=request.POST['message']
    appointment=Appointment.objects.create(from_patient_name=fullName,from_patient_email=email,time=time,date=date,doctor_mail=doctor,message=message)
    return render(request,'main/appointment.html',{'fullName':fullName,'email':email,'time':time,'date':date, 'doctor':doctor,'message':message})

def medical_history_check(request):
    patient_email=request.POST['patient_email']
    patient_obj=Patient.objects.all().get(email=patient_email)
    drugallergies=request.POST['drugallergies']
    all_illness=request.POST['allillness']
    all_operations=request.POST['alloperations']
    current_medication=request.POST['current_medication']
    medical_history_obj=Medical_history.objects.create(patient_obj=patient_obj,drugallergies=drugallergies,all_illness=all_illness,all_operations=all_operations,current_medication=current_medication)
    return redirect('patient_home')

def checkdisease(request):
    diseaselist=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction','Peptic ulcer diseae','AIDS','Diabetes ',
    'Gastroenteritis','Bronchial Asthma','Hypertension ','Migraine','Cervical spondylosis','Paralysis (brain hemorrhage)',
    'Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D',
    'Hepatitis E', 'Alcoholic hepatitis','Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
    'Heart attack', 'Varicose veins','Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis',
    'Arthritis', '(vertigo) Paroymsal  Positional Vertigo','Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo']


    symptomslist=['itching','skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain',
    'stomach_pain','acidity','ulcers_on_tongue','muscle_wasting','vomiting','burning_micturition','spotting_ urination',
    'fatigue','weight_gain','anxiety','cold_hands_and_feets','mood_swings','weight_loss','restlessness','lethargy',
    'patches_in_throat','irregular_sugar_level','cough','high_fever','sunken_eyes','breathlessness','sweating',
    'dehydration','indigestion','headache','yellowish_skin','dark_urine','nausea','loss_of_appetite','pain_behind_the_eyes',
    'back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
    'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
    'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
    'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
    'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
    'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
    'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
    'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
    'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
    'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
    'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
    'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
    'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
    'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
    'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
    'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
    'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
    'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
    'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
    'yellow_crust_ooze']

    alphabaticsymptomslist = sorted(symptomslist)

  


    # if request.method == 'GET':
    
    return render(request,'main/patient_home.html', {"list2":alphabaticsymptomslist})




    if request.method == 'POST':
       
      ## access you data by playing around with the request.POST object
      
        inputno = int(request.POST["noofsym"])
        print(inputno)
        if (inputno == 0 ) :
            return JsonResponse({'predicteddisease': "none",'confidencescore': 0 })

        else :

            psymptoms = []
            psymptoms = request.POST.getlist("symptoms[]")
            
            print(psymptoms)

        
        # """      #main code start from here...
        # """
        

        
            testingsymptoms = []
            #append zero in all coloumn fields...
            for x in range(0, len(symptomslist)):
                testingsymptoms.append(0)


            #update 1 where symptoms gets matched...
            for k in range(0, len(symptomslist)):

                for z in psymptoms:
                    if (z == symptomslist[k]):
                        testingsymptoms[k] = 1


            inputtest = [testingsymptoms]

            print(inputtest)
            

            predicted = model.predict(inputtest)
            print("predicted disease is : ")
            print(predicted)

            y_pred_2 = model.predict_proba(inputtest)
            confidencescore=y_pred_2.max() * 100
            print(" confidence score of : = {0} ".format(confidencescore))

            confidencescore = format(confidencescore, '.0f')
            predicted_disease = predicted[0]

            

            #consult_doctor codes----------

            #   doctor_specialization = ["Rheumatologist","Cardiologist","ENT specialist","Orthopedist","Neurologist",
            #                             "Allergist/Immunologist","Urologist","Dermatologist","Gastroenterologist"]
            

            Rheumatologist = [  'Osteoarthristis','Arthritis']
            
            Cardiologist = [ 'Heart attack','Bronchial Asthma','Hypertension ']
            
            ENT_specialist = ['(vertigo) Paroymsal  Positional Vertigo','Hypothyroidism' ]

            Orthopedist = []

            Neurologist = ['Varicose veins','Paralysis (brain hemorrhage)','Migraine','Cervical spondylosis']

            Allergist_Immunologist = ['Allergy','Pneumonia',
            'AIDS','Common Cold','Tuberculosis','Malaria','Dengue','Typhoid']

            Urologist = [ 'Urinary tract infection',
                'Dimorphic hemmorhoids(piles)']

            Dermatologist = [  'Acne','Chicken pox','Fungal infection','Psoriasis','Impetigo']

            Gastroenterologist = ['Peptic ulcer diseae', 'GERD','Chronic cholestasis','Drug Reaction','Gastroenteritis','Hepatitis E',
            'Alcoholic hepatitis','Jaundice','hepatitis A',
                'Hepatitis B', 'Hepatitis C', 'Hepatitis D','Diabetes ','Hypoglycemia']
                
            if predicted_disease in Rheumatologist :
                consultdoctor = "Rheumatologist"
                
            if predicted_disease in Cardiologist :
                consultdoctor = "Cardiologist"
                

            elif predicted_disease in ENT_specialist :
                consultdoctor = "ENT specialist"
            
            elif predicted_disease in Orthopedist :
                consultdoctor = "Orthopedist"
            
            elif predicted_disease in Neurologist :
                consultdoctor = "Neurologist"
            
            elif predicted_disease in Allergist_Immunologist :
                consultdoctor = "Allergist/Immunologist"
            
            elif predicted_disease in Urologist :
                consultdoctor = "Urologist"
            
            elif predicted_disease in Dermatologist :
                consultdoctor = "Dermatologist"
            
            elif predicted_disease in Gastroenterologist :
                consultdoctor = "Gastroenterologist"
            
            else :
                consultdoctor = "other"


            request.session['doctortype'] = consultdoctor 

            patientusername = request.session['patientusername']
            puser = User.objects.get(username=patientusername)
            

            #saving to database.....................

            patient = puser.patient
            diseasename = predicted_disease
            no_of_symp = inputno
            symptomsname = psymptoms
            confidence = confidencescore

            diseaseinfo_new = diseaseinfo(patient=patient,diseasename=diseasename,no_of_symp=no_of_symp,symptomsname=symptomsname,confidence=confidence,consultdoctor=consultdoctor)
            diseaseinfo_new.save()
            

            request.session['diseaseinfo_id'] = diseaseinfo_new.id

            print("disease record saved sucessfully.............................")

            return JsonResponse({'predicteddisease': predicted_disease ,'confidencescore':confidencescore , "consultdoctor": consultdoctor})


def medical_history_obj(request):
    data=request.body
    data=data.decode("utf-8")
    data=json.loads(data)
    patient_obj_mail=data['patient_obj_email1']
    patient_obj=Patient.objects.all().get(email=patient_obj_mail)
    medicalobj=Medical_history.objects.all().get(patient_obj=patient_obj)
    context={
        'drugallergies':medicalobj.drugallergies,
        'all_illness':medicalobj.all_illness,
        'all_operations':medicalobj.all_operations,
        'current_medication':medicalobj.current_medication,
    }
    context=json.dumps(context)
    return HttpResponse(context,content_type='application/json')

class LineChartJSONView(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["Temperature","Low_Temp","High_Temp"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_temp,
                [35 for x in range(7)],
                [39 for x in range(7)]]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = self.get_colors()
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = tuple(next(color_generator))
            dataset = {"data": entry}
            dataset["fill"]="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            if providers[i]=="Low_Temp":
                dataset["borderDash"]=[5,5]
            if providers[i]=="High_Temp":
                dataset["borderDash"]=[5,5]
            datasets.append(dataset)
        return datasets

line_chart = TemplateView.as_view(template_name='doctor_home.html')
line_chart1 = TemplateView.as_view(template_name='patient_home.html')
line_chart_json = LineChartJSONView.as_view()


class LineChartJSONViewbmi(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["BMI","BMI_low","BMI_high"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_bmi,
                [18 for x in range(7)],
                [24 for x in range(7)]]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(166,133,93),(202, 201, 197),(202, 201, 197)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            if i==0:
                dataset['fill']="false"
            if i==1:
                dataset['fill']="+1"
            else:
                dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets

bmi_chart = TemplateView.as_view(template_name='doctor_home.html')
bmi_chart_json = LineChartJSONViewbmi.as_view()

class LineChartJSONViewbp(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["Systolic","Diastolic"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_bps,
                list_bpd]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191),(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets

bp_chart = TemplateView.as_view(template_name='doctor_home.html')
bp_chart_json = LineChartJSONViewbp.as_view()

class LineChartJSONViewsc(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["SC"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_sc]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets

sc_chart = TemplateView.as_view(template_name='doctor_home.html')
sc_chart_json = LineChartJSONViewsc.as_view()


class LineChartJSONViewpulse(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["Pulse"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_pulse]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets

pulse_chart = TemplateView.as_view(template_name='doctor_home.html')
pulse_chart_json = LineChartJSONViewpulse.as_view()

class LineChartJSONViewo2(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["O2"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_o2]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets
o2_chart = TemplateView.as_view(template_name='doctor_home.html')
o2_chart_json = LineChartJSONViewo2.as_view()

class LineChartJSONViewrr(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["RR"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_rr]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets
rr_chart = TemplateView.as_view(template_name='doctor_home.html')
rr_chart_json = LineChartJSONViewrr.as_view()

class LineChartJSONViewecg(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["ECG"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(80,140) for x in range(7)]]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(122, 159, 191)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            dataset['fill']="false"

            # if i==0:
            #     dataset['fill']="false"
            # if i==1:
            #     dataset['fill']="+1"
            # else:
            #     dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets
ecg_chart = TemplateView.as_view(template_name='doctor_home.html')
ecg_chart_json = LineChartJSONViewecg.as_view()


class LineChartJSONViewhb(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list_date

    def get_providers(self):
        """Return names of datasets."""
        return ["HB"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [list_hb]
    def get_colors(self):
        return next_color()
    # def get_dataset_options(self):
        # default_opt = {
        #     "fill":"false",
        # }
        # return default_opt
    def get_datasets(self):
        datasets=[]
        color_generator = [(166,133,93),(202, 201, 197),(202, 201, 197)]
        data = self.get_data()
        providers = self.get_providers()
        num = len(providers)
        for i, entry in enumerate(data):
            color = color_generator[i]
            dataset = {"data": entry}
            if i==0:
                dataset['fill']="false"
            if i==1:
                dataset['fill']="+1"
            else:
                dataset['fill']="false"
            dataset.update(self.get_dataset_options(i, color))
            if i < num:
                dataset["label"] = providers[i]  # series labels for Chart.js
                dataset["name"] = providers[i]  # HighCharts may need this
            datasets.append(dataset)
            
        return datasets

hb_chart = TemplateView.as_view(template_name='doctor_home.html')
hb_chart_json = LineChartJSONViewhb.as_view()

def ecg(request):
    print("hey")
    MYSQL_HOSTNAME = '167.71.239.77'
    MYSQL_USER = 'anshita'
    MYSQL_PASSWORD = 'anshita'
    MYSQL_DATABASE = 'ecg'
    connection_string = f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOSTNAME}/{MYSQL_DATABASE}'
    db = create_engine(connection_string)
    query = """SELECT * FROM ecg_v;""".format(MYSQL_DATABASE)
    df = pd.read_sql(query, con=db)
    df.set_index("ms", drop=True, append=False, inplace=False, verify_integrity=False)
    sns.set(style='whitegrid', rc={'axes.facecolor': 'w'})
    settings = {}
    settings['fs'] = 500
    def get_plot_ranges(start=10, end=20, n=5):
    # '''
    # Make an iterator that divides into n or n+1 ranges. 
    # - if end-start is divisible by steps, return n ranges
    # - if end-start is not divisible by steps, return n+1 ranges, where the last range is smaller and ends at n

    # # Example:
    # >> list(get_plot_ranges())
    # >> [(0.0, 3.0), (3.0, 6.0), (6.0, 9.0)]

    # '''
        distance = end - start
        for i in np.arange(start, end, np.floor(distance/n)):
            yield (int(i), int(np.minimum(end, np.floor(distance/n) + i)))
    def group_peaks(p, threshold=5):
    # '''
    # The peak detection algorithm finds multiple peaks for each QRS complex. 
    # Here we group collections of peaks that are very near (within threshold) and we take the median index 
    # '''
    # initialize output
        output = np.empty(0)

        # label groups of sample that belong to the same peak
        peak_groups, num_groups = label(np.diff(p) < threshold)

        # iterate through groups and take the mean as peak index
        for i in np.unique(peak_groups)[1:]:
            peak_group = p[np.where(peak_groups == i)]
            output = np.append(output, np.median(peak_group))
        return output
    def detect_peaks(ecg_signal, threshold=0.3, qrs_filter=None):
    # '''
    # Peak detection algorithm using cross corrrelation and threshold 
    # '''
        if qrs_filter is None:
            # create default qrs filter
            t = np.linspace(1.5 * np.pi, 3.5 * np.pi, 15)
            qrs_filter = np.sin(t)
        
        # normalize data
        ecg_signal = (ecg_signal - ecg_signal.mean()) / ecg_signal.std()

        # calculate cross correlation
        similarity = np.correlate(ecg_signal, qrs_filter, mode="same")
        similarity = similarity / np.max(similarity)

        # return peaks (values in ms) using threshold
        return ecg_signal[similarity > threshold].index, similarity
    plt.figure(figsize=(40, 10))
    start = 0
    stop = 5000
    duration = (stop-start) / settings['fs']
    plt.title("ECG signal, slice of %.1f seconds" % duration, fontsize=24)
    plt.xlabel("Time (ms)", fontsize=16)
    plt.ylabel("Amplitude (arbitrary unit)", fontsize=16)
    plt.plot(df[start:stop].index, df[start:stop].heartrate, color='b', linewidth=1)
    # plt.show()
    sampfrom = 10000
    sampto = 30000
    nr_plots = 1

    for start, stop in get_plot_ranges(sampfrom, sampto, nr_plots):
        # get slice data of ECG data
        cond_slice = (df.index >= start) & (df.index < stop) 
        ecg_slice = df.heartrate[cond_slice]
        print(ecg_slice)
        # detect peaks
        peaks, similarity = detect_peaks(ecg_slice, threshold=0.3)
        
        # plot similarity
        plt.figure(figsize=(40, 20))

        plt.subplot(211)
        plt.title("ECG signal with found peaks", fontsize=24)
        plt.plot(ecg_slice.index, ecg_slice, label="ECG", color="blue", linewidth=1)
        plt.plot(peaks, np.repeat(600, peaks.shape[0]), markersize=10, label="peaks", color="red", marker="o", linestyle="None")
        plt.legend(loc="upper right", fontsize=20)
        plt.xlabel("Time (milliseconds)", fontsize=16)
        plt.ylabel("Amplitude", fontsize=16)
        # plt.savefig("peaks1-%s-%s.png" % (start, stop))

        plt.subplot(212)
        plt.title('Similarity with QRS template', fontsize=24)
        plt.plot(ecg_slice.index, similarity, label="Similarity with QRS filter", color="green", linewidth=1)
        plt.legend(loc="upper right", fontsize=20)
        plt.xlabel("Time (milliseconds)", fontsize=16)
        plt.ylabel("Similarity (normalized)", fontsize=16)
        
        plt.savefig("peaks-%s-%s.png" % (start, stop))
    peaks, similarity = detect_peaks(df.heartrate, threshold=0.3)

    # group peaks
    grouped_peaks = group_peaks(peaks)

    # plot peaks
    plt.figure(figsize=(40, 10))
    plt.title("Group similar peaks together", fontsize=24)
    plt.plot(df.index, df.heartrate, label="ECG", color="blue", linewidth=2)
    plt.plot(peaks, np.repeat(600, peaks.shape[0]), markersize=10, label="peaks", color="orange", marker="o", linestyle="None")
    plt.plot(grouped_peaks, np.repeat(620, grouped_peaks.shape[0]), markersize=12, label="grouped peaks", color="k", marker="v", linestyle="None")
    plt.legend(loc="upper right", fontsize=20)
    plt.xlabel("Time (ms)", fontsize=16)
    plt.ylabel("Amplitude (arbitrary unit)", fontsize=16)
    plt.gca().set_xlim(0, 200)

    peaks, similarity = detect_peaks(df.heartrate, threshold=0.3)

    # group peaks so we get a single peak per beat (hopefully)
    grouped_peaks = group_peaks(peaks)

    # RR-intervals are the differences between successive peaks
    rr = np.diff(grouped_peaks)

    # plot RR-intervals
    plt.figure(figsize=(40, 15))
    plt.title("RR-intervals", fontsize=24)
    plt.xlabel("Time (ms)", fontsize=16)
    plt.ylabel("RR-interval (ms)", fontsize=16)

    plt.plot(np.cumsum(rr), rr, label="RR-interval", color="#A651D8", linewidth=2)

    plt.figure(figsize=(40, 10))
    plt.title("Distribution of RR-intervals", fontsize=24)
    sns.kdeplot(rr, label="rr-intervals", color="#A651D8", shade=True)

    outlier_low = np.mean(rr)-2 * np.std(rr)
    outlier_high = np.mean(rr)+2 * np.std(rr)

    plt.axvline(x=outlier_low)
    plt.axvline(x=outlier_high, label="outlier boundary")
    plt.text(outlier_low - 270, 0.004, "outliers low (< mean - 2 sigma)", fontsize=20)
    plt.text(outlier_high + 20, 0.004, "outliers high (> mean + 2 sigma)", fontsize=20)

    plt.xlabel("RR-interval (ms)", fontsize=16)
    plt.ylabel("Density", fontsize=16)

    plt.legend(fontsize=24)


    plt.figure(figsize=(40, 15))

    rr_corrected = rr.copy()
    rr_corrected[np.abs(zscore(rr)) > 2] = np.median(rr)

    plt.title("RR-intervals", fontsize=24)
    plt.xlabel("Time (ms)", fontsize=16)
    plt.ylabel("RR-interval (ms)", fontsize=16)

    plt.plot(rr, color="red", linewidth=1, label="RR-intervals")
    plt.plot(rr_corrected, color="green", linewidth=2, label="RR-intervals after correction")
    plt.legend(fontsize=20)


    sampfrom = 2000
    sampto = 15000
    nr_plots = 2

    # detect peaks
    peaks, similarity = detect_peaks(df.heartrate, threshold=0.3)

    # group peaks so we get a single peak per beat (hopefully)
    grouped_peaks = group_peaks(peaks)

    # RR-intervals are the differences between successive peaks
    rr = np.diff(grouped_peaks)

    for start, stop in get_plot_ranges(sampfrom, sampto, nr_plots):
        # plot similarity
        plt.figure(figsize=(35, 15))

        plt.title("ECG signal & RR-intervals", fontsize=24)
        plt.plot(df.index, df.heartrate, label="ECG", color="blue", linewidth=1)
        plt.plot(grouped_peaks, np.repeat(600, grouped_peaks.shape[0]), markersize=14, label="Found peaks", color="orange", marker="o", linestyle="None")
        plt.legend(loc="upper left", fontsize=20)
        plt.xlabel("Time", fontsize=16)
        plt.ylabel("Amplitude", fontsize=16)
        plt.gca().set_ylim(400, 800)
        
        ax2 = plt.gca().twinx()
        ax2.plot(np.cumsum(rr)+peaks[0], rr, label="RR-intervals", color="#A651D8", linewidth=2, markerfacecolor="#A651D8", markeredgewidth=0, marker="o", markersize=18)
        ax2.set_xlim(start, stop)
        ax2.set_ylim(-2000, 2000)
        ax2.legend(loc="upper right", fontsize=20)

        plt.xlabel("Time (ms)", fontsize=16)
        plt.ylabel("RR-interval (ms)", fontsize=16)

        # plt.savefig("ecg-with-rr-%s-%s.png" % (start, stop))



    np.savetxt("rr1.txt", rr_corrected, fmt='%d')



    rr = np.loadtxt("rr1.txt", dtype=int)



    hr = 60000/rr
    results={}
    # mean RR-interval
    re1=results['Mean RR (ms)'] = np.mean(rr)
    re2=results['STD RR/SDNN (ms)'] = np.std(rr)
    re3=results['Mean HR (Kubios\' style) (beats/min)'] = 60000/np.mean(rr)
    re4=results['Mean HR (beats/min)'] = np.mean(hr)
    re5=results['STD HR (beats/min)'] = np.std(hr)
    re6=results['Min HR (beats/min)'] = np.min(hr)
    re7=results['Max HR (beats/min)'] = np.max(hr)
    re8=results['RMSSD (ms)'] = np.sqrt(np.mean(np.square(np.diff(rr))))
    re9=results['NNxx'] = np.sum(np.abs(np.diff(rr)) > 50)*1
    re10=results['pNNxx (%)'] = 100 * np.sum((np.abs(np.diff(rr)) > 50)*1) / len(rr)
    print("Time domain metrics")
    print("Mean RR (ms)",re1)
    print('STD RR/SDNN (ms)',re2)
    print('Mean HR (beats/min)',re4)
    print('STD HR (beats/min)',re5)
    print('Min HR (beats/min)',re6)
    print('Max HR (beats/min)',re7)
    print('RMSSD (ms)',re8)
    print('NNxx',re9)
    print('pNNxx (%)',re10)

    fs = 4.0
    steps = 1 / fs

    # create interpolation function based on the rr-samples. 
    x = np.cumsum(rr) / 1000.0
    f = interp1d(x, rr, kind='cubic')

    # now we can sample from interpolation function
    xx = np.arange(1, np.max(x), steps)
    rr_interpolated = f(xx)
    plt.figure(figsize=(30, 20))

    plt.subplot(211)
    plt.title("RR intervals", fontsize=24)
    plt.plot(x, rr, label="RR-Intervals", color="k", markerfacecolor="#A651D8", markeredgewidth=0, marker="o", markersize=12)
    plt.xlabel("Time (s)")
    plt.ylabel("RR-interval (ms)")
    plt.title("Interpolated", fontsize=24)
    plt.gca().set_xlim(0, 20)

    plt.subplot(212)
    plt.title("RR intervals, interpolated", fontsize=24)
    plt.plot(xx, rr_interpolated, label="RR-Intervals (interpolated)", color="k", markerfacecolor="#51A6D8", markeredgewidth=0, marker="o", markersize=10)
    plt.gca().set_xlim(0, 20)
    plt.xlabel("Time (s)", fontsize=16)
    plt.ylabel("RR-interval (ms)", fontsize=16)
    fs=4
    fxx, pxx = signal.welch(x=rr_interpolated, fs=fs)
    
    # '''
    # Segement found frequencies in the bands 
    #  - Very Low Frequency (VLF): 0-0.04Hz 
    #  - Low Frequency (LF): 0.04-0.15Hz 
    #  - High Frequency (HF): 0.15-0.4Hz
    # '''
    cond_vlf = (fxx >= 0) & (fxx < 0.04)
    cond_lf = (fxx >= 0.04) & (fxx < 0.15)
    cond_hf = (fxx >= 0.15) & (fxx < 0.4)
    
    # calculate power in each band by integrating the spectral density 
    vlf = trapz(pxx[cond_vlf], fxx[cond_vlf])
    lf = trapz(pxx[cond_lf], fxx[cond_lf])
    hf = trapz(pxx[cond_hf], fxx[cond_hf])
    
    # sum these up to get total power
    total_power = vlf + lf + hf

    # find which frequency has the most power in each band
    peak_vlf = fxx[cond_vlf][np.argmax(pxx[cond_vlf])]
    peak_lf = fxx[cond_lf][np.argmax(pxx[cond_lf])]
    peak_hf = fxx[cond_hf][np.argmax(pxx[cond_hf])]

    # fraction of lf and hf
    lf_nu = 100 * lf / (lf + hf)
    hf_nu = 100 * hf / (lf + hf)
    
    results = {}
    re11=results['Power VLF (ms2)'] = vlf
    re12=results['Power LF (ms2)'] = lf
    re13=results['Power HF (ms2)'] = hf   
    re14=results['Power Total (ms2)'] = total_power

    re15=results['LF/HF'] = (lf/hf)
    re16=results['Peak VLF (Hz)'] = peak_vlf
    re17=results['Peak LF (Hz)'] = peak_lf
    re18=results['Peak HF (Hz)'] = peak_hf

    re19=results['Fraction LF (nu)'] = lf_nu
    re20=results['Fraction HF (nu)'] = hf_nu
    
    context1={
        'rr':int(re1),
        'pr':int(re4),
        'Heart_rate':int(re4),
        'RMSSD':int(re8),
        'NNxx':int(re9),
        'pNNxx':int(re10),
        'LF':int(re12),
        'HF':int(re13),
        'LF_HF':int(re15),
    }
    print("Frequency domain metrics:")
    context=json.dumps(context1)
    return HttpResponse(context,content_type='application/json')

def checkdisease_drive(request):
    value=request.body
    value=value.decode("utf-8")
    value=json.loads(value)  
    value_symp=value['disease']  
    print(value_symp)
    data = pd.read_excel('raw_data.xlsx')
    # print(data)
    data = data.fillna(method='ffill')
    # print(data)
    def process_name(data):
        data_list = []
        data_name = data.replace('^','_').split('_')
        n = 1
        # print(data_name)
        for names in data_name:
            if n%2==0:
                data_list.append(names)
            n+=1
        # print(data_list)
        return data_list
    disease_list = []
    disease_symptom_dict = defaultdict(list)
    disease_symptom_count = {}
    count = 0

    for idx, row in data.iterrows():
        
        # Get the Disease Names
        if (row['Disease'] !="\xc2\xa0") and (row['Disease'] != ""):
            disease = row['Disease']
            # print(disease)
            disease_list = process_name(data=disease)
            # print(disease_list)
            count = row['Count of Disease Occurrence']
            # print(count)

        # Get the Symptoms Corresponding to Diseases
        if (row['Symptom'] !="\xc2\xa0") and (row['Symptom'] != ""):
            symptom = row['Symptom']
            symptom_list = process_name(data=symptom)
            for d in disease_list:
                for s in symptom_list:
                    disease_symptom_dict[d].append(s)
                disease_symptom_count[d] = count
    with open('dataset_clean.csv','w') as csvfile:
        writer = csv.writer(csvfile)
        for key, value in disease_symptom_dict.items():
            for v in value:
                key = str.encode(key).decode('utf-8')
                writer.writerow([key,v,disease_symptom_count[key]])
    columns = ['Source', 'Target', 'Weight']
    data = pd.read_csv('dataset_clean.csv', names=columns, encoding='ISO-8859-1')
    data.head()
    data.to_csv('dataset_clean.csv',index=False)
    unique_diseases = data['Source'].unique()
    # print('No. of diseases:', len(unique_diseases))
    # print('Disease:')
    # for disease in unique_diseases:
        # print(disease)
    unique_symptoms = data['Target'].unique()
    # print('No. of symptoms',len(unique_symptoms))
    # print('Symptoms:')
    # for symptom in unique_symptoms:
        # print(symptom)
    df_1 = pd.get_dummies(data.Target)
    # print(df_1.head())
    df_s = data['Source']
    # print(df_s.head())
    df_pivoted = pd.concat([df_s, df_1], axis=1)
    df_pivoted.drop_duplicates(keep='first',inplace=True)
    df_pivoted = df_pivoted.groupby('Source',sort=False).sum()
    df_pivoted = df_pivoted.reset_index()
    df_pivoted.head()
    df_pivoted.to_csv('df_pivoted.csv')
    x = df_pivoted[df_pivoted.columns[1:]]
    y = df_pivoted['Source']
    # print(x[:5])
    # print(y[:5])
    weights = np.fromiter(disease_symptom_count.values(), dtype=float)
    total=sum(weights)
    prob = weights/total
    # print(prob)
    mnb_tot = MultinomialNB()
    mnb_tot = mnb_tot.fit(x, y)
    mnb_tot.score(x, y)
    disease_pred = mnb_tot.predict(x)
    disease_real = y.values
    # for i in range(0, len(disease_real)):
    #     if disease_pred[i]!=disease_real[i]:
            # print('Pred:',disease_pred[i])
            # print('Actual:',disease_real[i])
            # print('##########################')
    # Using class prior prob
    mnb_prob = MultinomialNB(class_prior=prob)
    mnb_prob = mnb_prob.fit(x, y)
    mnb_prob.score(x, y)
    disease_pred = mnb_prob.predict(x)
    # for i in range(0, len(disease_real)):
    #     if disease_pred[i]!=disease_real[i]:
            # print('Pred:',disease_pred[i])
            # print('Actual:',disease_real[i])
            # print('##########################')
    filename = 'NB_model.sav'
    pickle.dump(mnb_tot, open(filename, 'wb'))
    model = pickle.load(open(filename,'rb'))
    # model.predict([100*[1]+100*[0]+204*[0]])
    symptoms = df_pivoted.columns[1:].values
    # value_symp=np.core.defchararray.split(value_symp)
    # print(symptoms)
    test_input = [0]*404
    # value_symp=list(value_symp)
    # value_symp.reshape(1, -1)
    user_symptoms = value_symp
    # user_symptoms=list(value_symp.split(','))
    print(user_symptoms)
    for symptom in user_symptoms:
        test_input[np.where(symptoms==symptom)[0][0]] = 1
    print('Most probable disease:',model.predict([test_input]))
    # unique_symptoms=unique_symptoms.tolist()
    # unique_diseases=unique_diseases.tolist()
    # unique_symptoms=json.dumps(unique_symptoms)
    ans=model.predict([test_input])
    context={
        'disease':ans.tolist(),
        # 'diseases':unique_diseases.tolist(),
    }
    context=json.dumps(context)
    return HttpResponse(context,content_type='application/json')