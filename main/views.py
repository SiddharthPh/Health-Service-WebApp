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

df=pd.read_csv('/home/siddharth/Intern_winter/sdn/main/data.csv')
patient_id=df['patient_id']
list_temp=[]
list_date=[]
list_bp=[]
list_bmi=[]
list_sc=[]
list_rr=[]
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
print(list_temp)
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
line_chart_json = LineChartJSONView.as_view()


class LineChartJSONViewbmi(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return ["January", "February", "March", "April", "May", "June", "July"]

    def get_providers(self):
        """Return names of datasets."""
        return ["BMI","BMI_low","BMI_high"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(15,28) for x in range(7)],
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
        return ["January", "February", "March", "April", "May", "June", "July"]

    def get_providers(self):
        """Return names of datasets."""
        return ["Systolic","Diastolic"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(80,140) for x in range(7)],
                [randint(60,90) for x in range(7)]]
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
        return ["January", "February", "March", "April", "May", "June", "July"]

    def get_providers(self):
        """Return names of datasets."""
        return ["Systolic","Diastolic"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(80,140) for x in range(7)],
                [randint(60,90) for x in range(7)]]
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

sc_chart = TemplateView.as_view(template_name='doctor_home.html')
sc_chart_json = LineChartJSONViewsc.as_view()


class LineChartJSONViewpulse(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return ["January", "February", "March", "April", "May", "June", "July"]

    def get_providers(self):
        """Return names of datasets."""
        return ["Systolic","Diastolic"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(80,140) for x in range(7)],
                [randint(60,90) for x in range(7)]]
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

pulse_chart = TemplateView.as_view(template_name='doctor_home.html')
pulse_chart_json = LineChartJSONViewpulse.as_view()

class LineChartJSONViewo2(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return ["January", "February", "March", "April", "May", "June", "July"]

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
o2_chart = TemplateView.as_view(template_name='doctor_home.html')
o2_chart_json = LineChartJSONViewo2.as_view()

class LineChartJSONViewrr(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return ["January", "February", "March", "April", "May", "June", "July"]

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
rr_chart = TemplateView.as_view(template_name='doctor_home.html')
rr_chart_json = LineChartJSONViewrr.as_view()

class LineChartJSONViewecg(BaseLineChartView):
    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return ["January", "February", "March", "April", "May", "June", "July"]

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
        return ["January", "February", "March", "April", "May", "June", "July"]

    def get_providers(self):
        """Return names of datasets."""
        return ["BMI","BMI_low","BMI_high"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [[randint(15,28) for x in range(7)],
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

hb_chart = TemplateView.as_view(template_name='doctor_home.html')
hb_chart_json = LineChartJSONViewhb.as_view()