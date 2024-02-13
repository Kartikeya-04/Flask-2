from flask import Flask, render_template, request, redirect, url_for,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_cors import CORS
from datetime import datetime
import os
import json
from dotenv import load_dotenv,dotenv_values

app=Flask(__name__)
CORS(app)
load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI']=os.getenv("MYDATABASE")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)

class Todo(db.Model):
    sno= db.Column(db.Integer,primary_key=True)
    Name= db.Column(db.String(400),nullable=False)
    Location=db.Column(db.String(600),nullable=False)
    date_created=db.Column(db.DateTime,default=datetime.utcnow)

    def __repr__(self)->str:
        return f"{self.title}-{self.sno}"

@app.route('/submit',methods=['GET','POST'])
def hello():
    if request.method =='POST':
        data=request.get_json(force=True)
        title = data.get('Name')
        desc = data.get('Location')
        print('hello')
        print(f"{title} and {desc}")
        todo=Todo(Name=title , Location=desc)
        db.session.add(todo)
        db.session.commit()
        
        done="saved!"

        return jsonify(done)
        


    
    # alltodo=Todo.query.all()
    # serialized = [{'title': item.title, 'desc': item.desc} for item in alltodo]

    # return jsonify(serialized)
@app.route('/',methods=['GET','POST'])
def display():
     alltodo=Todo.query.all()
     serialized = [{'Name': item.Name, 'Location': item.Location,'Time':item.date_created} for item in alltodo]
     return jsonify(serialized)


@app.route("/delete",methods=['DELETE'])
def delete():
    if request.method=='DELETE':
        deldata= request.get_json(force=True)
        Name=deldata.get('Name')
        Location=deldata.get('Location')
        todel= Todo.query.filter(func.lower(Todo.Name)==func.lower(Name) ,func.lower(Todo.Location)==func.lower(Location)).first()
        if todel is None:
          
          return jsonify("Data Not Found !!!")


        
        db.session.delete(todel)
        db.session.commit()
        ans='deleted!'

        return jsonify(ans)
    
@app.route("/update",methods=['POST'])
def updateInfo():
     if request.method=='POST':
        updatedData= request.get_json(force=True)
        Name=updatedData.get('Name')
        Location=updatedData.get('Location')  
        todel= Todo.query.filter(func.lower(Todo.Name)==func.lower(Name),func.lower(Todo.Location)==func.lower(Location)).first()
        NewName=updatedData.get('NewName')
        NewLocation=updatedData.get('NewLocation')
        if NewName is None:
            NewName=Name
        if NewLocation is None:
            NewLocation=Location
        todel.Name=NewName
        todel.Location=NewLocation
        db.session.add(todel)
        db.session.commit()
        return jsonify("Updated!!!")  
     
     return jsonify("Unable to find data to Updated!")




# on python interpreter I wrote from app import db
if not os.path.exists('todo.db'):
    with app.app_context():
        db.create_all()

if __name__=='__main__':
    app.run(debug=True,port=8325)




