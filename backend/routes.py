from flask import request, jsonify, Blueprint 
from models import User, Course, Enrollment
from database import db

api_bp = Blueprint('api', __name__)

#login
@api_bp.route('/login', methods = ['POST'])
def login():
  data = request.json
  username = data.get('username', '')
  password = data.get('password', '')
  user = User.query.filter_by(username=username).first()
  return jsonify({
    "id": user.id,
    "username": user.username,
    "role":user.role
  })

#student
@api_bp.route('/courses/all', methods = ['GET'])
def getAllCourses():
  courses = Course.query.all()
  return jsonify([{
    'id': c.id,
    'name': c.course_name
    } for c in courses])

@api_bp.route('/student/my-classes/<int:user_id>', methods = ['GET'])
def getStudentCourses(user_id):
  enrollments = Enrollment.query.filter_by(user_id=user_id).all()
  return jsonify([{
    'course_id': e.course_id,
    'grade': e.grade
  } for e in enrollments])

@api_bp.route('/course/<int:id>/enrollment-count', methods = ['GET'])
def getEnrollmentCount(id):
  count = Enrollment.query.filter_by(course_id = id).count()
  return jsonify({
    'course_id': id,
    'count': count
    })

@api_bp.route('/student/enroll/<int:course_id>', methods = ['POST'])
def enrollCourse(course_id):
  data = request.json
  new_enrollment = Enrollment(user_id=data['user_id'], course_id = course_id)
  db.session.add(new_enrollment)
  db.session.commit()
  return jsonify({
    "message": "Successful enrollment"
  })

#teacher
@api_bp.route('/teacher/my-classes/<int:teacher_id>', methods = ['GET'])
def getAllClassesTaught(teacher_id):
  classes = Course.query.filter_by(teacher_id=teacher_id).all()
  return jsonify([{
    'id': c.id,
    'name': c.course_name
  } for c in classes])


@api_bp.route('/teacher/course/<int:course_id>/students', methods = ['GET'])
def getAllStudents(course_id):
  studentCount = Enrollment.query.filter_by(course_id=course_id).all()
  return jsonify([{
    'user_id': e.user_id,
    'grade': e.grade
  } for e in studentCount])

@api_bp.route('/teacher/grade/<int:enrollment_id>', methods = ['POST'])
def gradeUpdate(enrollment_id):
  data = request.json
  enrollment = Enrollment.query.get(enrollment_id)
  enrollment.grade = data['grade']
  db.session.commit()
  return jsonify({"message": "Grade updated"})

#admin users
@api_bp.route('/admin/add-user', methods = ['POST'])
def addUser():
  data = request.json
  newUser = User(username=data['username'], role=data.get('role', 'student'), password=data.get('password', '123'))
  db.session.add(newUser)
  db.session.commit()
  return jsonify({"message": "User added"})

@api_bp.route('/admin/users', methods = ['GET'])
def getAllUsers():
  users = User.query.all()
  return jsonify([{
    'id': u.id,
    'username': u.username,
    'role': u.role
  } for u in users])

@api_bp.route('/admin/update-user/<int:user_id>', methods = ['POST'])
def updateUser(user_id):
  data = request.json
  user = User.query.get(user_id)
  if not user:
    return jsonify({"message": "User not found"}), 404
  if 'username' in data:
    user.username = data['username']
  if 'password' in data:
    user.password = data['password']
  if 'role' in data:
    user.role = data['role']
  db.session.commit()
  return jsonify({"message": "User updated"})

@api_bp.route('/admin/delete-user/<int:user_id>', methods = ['POST'])
def deleteUser(user_id):
  user = User.query.get(user_id)
  db.session.delete(user)
  db.session.commit()
  return jsonify({"message": "User deleted"})

#admin courses
@api_bp.route('/admin/courses', methods = ['GET'])
def getAllCourseAdmin():
  courses = Course.query.all()
  return jsonify([{
    'id': c.id,
    'name': c.course_name,
    'teacher_id': c.teacher_id
  } for c in courses])

@api_bp.route('/admin/add-course', methods = ['POST'])
def addCourse():
  data = request.json
  newCourse = Course(course_name=data['course_name'], teacher_id=data.get('teacher_id'))
  db.session.add(newCourse)
  db.session.commit()
  return jsonify({"message": "Course added"})

@api_bp.route('/admin/update-course/<int:course_id>', methods = ['POST'])
def updateCourse(course_id):
  data = request.json
  course = Course.query.get(course_id)
  if 'course_name' in data:
    course.course_name = data['course_name']
  if 'teacher_id' in data:
    course.teacher_id = data['teacher_id']
  db.session.commit()
  return jsonify({"message": "Course updated"})

@api_bp.route('/admin/delete-course/<int:course_id>', methods = ['POST'])
def deleteCourse(course_id):
  course = Course.query.get(course_id)
  db.session.delete(course)
  db.session.commit()
  return jsonify({"message": "Course deleted"})

#admin enrollments
@api_bp.route('/admin/enrollments', methods = ['GET'])
def getAllEnrollments():
  enrollments = Enrollment.query.all()
  return jsonify([{
    'id': e.id,
    'user_id': e.user_id,
    'course_id':e.course_id,
    'grade': e.grade
  } for e in enrollments])

@api_bp.route('/admin/add-enrollment', methods = ['POST'])
def addEnrollment():
  data = request.json
  newEnrollment = Enrollment(
    user_id = data['user_id'],
    course_id = data['course_id'],
    grade = data.get('grade')
  )
  db.session.add(newEnrollment)
  db.session.commit()
  return jsonify({"message": "Enrollment added"})

@api_bp.route('/admin/update-enrollment/<int:enrollment_id>', methods = ['POST'])
def updateEnrollment(enrollment_id):
  data = request.json
  enrollment = Enrollment.query.get(enrollment_id)
  if 'grade' in data:
    enrollment.grade = data['grade']
  if 'course_id' in data:
    enrollment.course_id = data['course_id']
  db.session.commit()
  return jsonify({"message": "Enrollment updated"})

@api_bp.route('/admin/delete-enrollment/<int:enrollment_id>', methods = ['POST'])
def deleteEnrollment(enrollment_id):
  enrollment = Enrollment.query.get(enrollment_id)
  db.session.delete(enrollment)
  db.session.commit()
  return jsonify({"message": "Enrollment deleted"})

