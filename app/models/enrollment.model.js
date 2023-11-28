const sql = require("./db");

const Enrollment = function (enrollment) {
  this.user_id = enrollment.user_id;
  this.course_id = enrollment.course_id;
  this.enrollment_date = new Date();
};

Enrollment.create = (user_id, course_id, result) => {
  const enrollment = new Enrollment({ user_id, course_id });

  sql.query(
    "INSERT INTO course_enrollment (user_id, course_id, enrollment_date) VALUES (?, ?, ?)",
    [enrollment.user_id, enrollment.course_id, enrollment.enrollment_date],
    (err, res) => {
      if (err) {
        console.log("Enrollment error: ", err);
        result(err, null);
        return;
      }
      console.log("Enrollment created: ", {
        user_id: enrollment.user_id,
        course_id: enrollment.course_id,
      });
      result(null, {
        user_id: enrollment.user_id,
        course_id: enrollment.course_id,
        id: res.insertId,
      });
    }
  );
};

Enrollment.getEnrollmentsForUser = (user_id, result) => {
  sql.query(
    "SELECT " +
      "E.enrollment_id, E.user_id, E.course_id, E.enrollment_date, " +
      "C.title AS course_title, C.description AS course_description, " +
      "C.pricing AS course_pricing, C.language AS course_language, " +
      "C.proficiency_level AS course_proficiency_level, " +
      "I.instructor_id, I.instructor_name, " +
      "L.title AS lesson_title, L.content AS lesson_content, " +
      "CP.* " + 
      "FROM course_enrollment E " +
      "JOIN course C ON E.course_id = C.course_id " +
      "LEFT JOIN lesson L ON E.course_id = L.course_id " +
      "LEFT JOIN instructor I ON C.instructor_id = I.instructor_id " +
      "LEFT JOIN course_progress CP ON E.user_id = CP.user_id AND E.course_id = CP.course_id " +
      "WHERE E.user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("Enrollments retrieval error: ", err);
        result(err, null);
        return;
      }
      console.log("Enrollments retrieved for user_id: ", user_id);
      result(null, res);
    }
  );
};

Enrollment.getAllEnrollments = (result) => {
  sql.query("SELECT * FROM course_enrollment", (err, res) => {
    if (err) {
      console.log("Enrollments retrieval error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Enrollment.checkEnrollmentStatus = (user_id, course_id, result) => {
  sql.query(
    "SELECT * FROM course_enrollment WHERE user_id = ? AND course_id = ?",
    [user_id, course_id],
    (err, res) => {
      if (err) {
        console.log("Enrollment status check error: ", err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("User is enrolled in the course.");
        result(null, true);
      } else {
        console.log("User is not enrolled in the course.");
        result(null, false);
      }
    }
  );
};

Enrollment.removeEnrollment = (id, result) => {
  sql.query(
    "DELETE FROM course_enrollment WHERE enrollment_id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted enrollment id: " + id);
      result(null, {
        enrollment_id: id,
        message: `Deleted enrollment_id: ${id} successfully`,
      });
    }
  );
};
module.exports = Enrollment;
