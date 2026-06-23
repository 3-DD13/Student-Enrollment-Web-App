from flask import request, jsonify, Blueprint 
from main import db, User, Course, Enrollment

api_bp = Blueprint('api', __name__)

#student
@api_bp.route('/courses/all', method=['GET'])
def getAllCourses():
  courses = Course.query.all()
  return jsonify([{
    'id': c.id,
    'name': c.courseName
    } for c in courses])

@api_bp.route('/student/my-classes/<int:user_id>', method=['GET'])
def getStudentCourses(user_id):
  enrollments = Enrollment.query.filter_by(user_id=user_id).all()
  return jsonify([{
    'course_id': e.course_id,
    'grade': e.grade
  } for e in enrollments])

@api_bp.route('/course/<int:id>/enrollment-count', method=['GET'])
def getEnrollmentCount(id):
  count = Enrollment.query.filter_by(course_id = id).count()
  return jsonify({
    'course_id': id,
    'count': count
    })

@api_bp.route('/student/enroll/<int:course_id>', method=['POST'])
def enrollCourse(course_id):
  data = request.json
  new_enrollment = Enrollment(user_id=data['user_id'], course_id = course_id)
  db.session.add(new_enrollment)
  db.session.commit()
  return jsonify({
    "message": "Successful enrollment"
  })

#teacher
@api_bp.route('/teacher/my-classes/<int:teacher_id>', method=['GET'])
def getAllClassesTaught(teacher_id):
  classes = Course.query.filter_by(teacher_id=teacher_id).all()
  return jsonify([{
    'id': c.id,
    'name': c.course_name
  } for c in classes])


@api_bp.route('/teacher/course/<int:course_id>/students', method=['GET'])
def getAllStudents(course_id):
  studentCount = Enrollment.query.filter_by(course_id=course_id).all()
  return jsonify([{
    'user_id': e.user_id,
    'grade': e.grade
  } for e in studentCount])

@api_bp.route('/teacher/grade/<int:enrollment_id>', method=['POST'])
def gradeUpdate(enrollment_id):
  data = request.json
  enrollment = Enrollment.query.get(enrollment_id)
  enrollment.grade = data['grade']
  db.session.commit()
  return jsonify({"message": "Grade updated"})

#admin
@api_bp.route('/admin/add-user', method=['POST'])
def addUser():
  data = request.json
  newUser = User(username=data['username'], role=data.get('role', 'student'))
  db.session.add(newUser)
  db.session.commit()
  return jsonify({"message": "User added"})