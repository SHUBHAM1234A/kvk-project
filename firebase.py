import firebase_admin
from firebase_admin import db
from datetime import date, datetime

cred_obj = firebase_admin.credentials.Certificate('key.json')
default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL':"https://attendance-71d29-default-rtdb.firebaseio.com/"
})

def read_data(path):
    return db.reference(path).get()

def write_data(path, data):
    try:
        db.reference(path).set(data)
        return True
    except Exception as e:
        print(e)
        return False

def delete_data(path):
    try:
        db.reference(path).delete()
        return True
    except Exception as e:
        print(e)
        return False

def get_date_time():
    time_ = datetime.now().strftime("%I:%M:%S %p")
    date_ = date.today().strftime("%d-%m-%Y")
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    date_ = f"{date_.split('-')[0]} {months[int(date_.split('-')[1]) - 1]} {date_.split('-')[2]}"
    return f"{time_}, {date_}"

# An Example of taking data and writting in database.

name = input("Enter your name: ")
class_ = input("Enter your class: ")
section = input("Enter your section: ")
roll = input("Enter your roll no.: ")
uid = input("Enter your UID: ")

write_data(f"/{uid}", {
    'class': int(class_), 
    'lastScanned': get_date_time(), 
    'name': name, 
    'roll': int(roll),
    'section': section.upper()
})

print(read_data(f"/{uid}"))