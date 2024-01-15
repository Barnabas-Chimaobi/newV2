import { gql, useQuery, useLazyQuery } from "@apollo/client";

export const ADMISSION_LETTER_DETAILS = gql`
  query AdmissionLetterDetails($applicationformnumber: String!) {
    admissionLetterDetails(applicationformnumber: $applicationformnumber) {
      fullName
      passportUrl
      registrarName
      session
      programmeName
      departmentName
      facultyName
      applicantStatus
      applicantStatusId
    }
  }
`;

export const ADMITTED_RECORD_BY_APPLICATION_FORM_NUMBER = gql`
  query AdmittedRecordByApplicationFormNumber($formNumber: String!) {
    admittedRecordByApplicationFormNumber(formNumber: $formNumber) {
      admissionBatchId
      admissionBatchName
      admissionListId
      applicantionFormNumber
      applicationFormId
      departmentId
      departmentName
      departmentOptionId
      departmentOptionName
      personId
      personName
      programmeId
      programmeName
      sessionId
      sessionName
    }
  }
`;

export const ADMITTED_APPLICANTS = gql`
  query AdmittedApplicants(
    $programmeid: Int!
    $departmentid: Int!
    $sessionid: Int!
  ) {
    admittedApplicants(
      programmeid: $programmeid
      departmentid: $departmentid
      sessionid: $sessionid
    ) {
      personName
      departmentOptionName
      departmentName
      programmeName
      applicantionFormNumber
      programmeId
      departmentId
      sessionName
      personId
      admissionBatchName
      admissionBatchId
      sessionId
      departmentOptionId
      admissionListId
      applicationFormId
    }
  }
`;

export const ALL_APPLICATIONFORMNUMBERSETUP = gql`
  query AllApplicationFormNumberSetup {
    allApplicationFormNumberSetup {
      applicationNumberPrefix
      id
      programme {
        id
        name
      }
    }
  }
`;
export const ALL_COURSE = gql`
  query AllCourse {
    allCourse {
      code
      id
      name
    }
  }
`;
export const ALL_MENU = gql`
  query AllMenu {
    allMenu {
      name
      id
      path
      icon
    }
  }
`;
export const ALL_MENU_GROUP = gql`
  query AllMenuGroup {
    allMenuGroup {
      name
      id
      icon
    }
  }
`;
export const ALL_MENU_ROLE = gql`
  query AllMenuRole {
    allMenuRole {
      id
      menu {
        name
        menuGroup {
          name
        }
      }
      menuId
      role {
        roleName
      }
      roleId
    }
  }
`;

export const ALL_PAID_INVOICE_REPORT_FILTER = gql`
  query AllPaidInvoiceReportFilter(
    $sessionid: Int!
    $feetypeid: Int!
    $paymentmode: Int!
    $programmeid: Int!
    $departmentid: Int!
  ) {
    allPaidInvoiceReportFilter(
      sessionid: $sessionid
      feetypeid: $feetypeid
      paymentmode: $paymentmode
      programmeid: $programmeid
      departmentid: $departmentid
    ) {
      fullName
      total
      session {
        name
      }
      id
      invoiceNumber
      feeDetail {
        feeType {
          name
        }
      }
      matricNumber
    }
  }
`;

export const ALL_PAID_INVOICE = gql`
  query AllPaidInvoice {
    allPaidInvoice {
      id
      feeDetail {
        feeType {
          name
        }
      }
      session {
        name
      }
      total
      matricNumber
      person {
        biodata {
          name
        }
      }
      invoiceNumber
    }
  }
`;

export const ALL_PAID_INVOICE_FILTER = gql`
  query AllPaidInvoiceReportFilter(
    $sessionid: Int!
    $feetypeid: Int!
    $paymentmode: Int!
    $programmeid: Int!
    $departmentid: Int!
  ) {
    allPaidInvoiceReportFilter(
      sessionid: $sessionid
      feetypeid: $feetypeid
      paymentmode: $paymentmode
      programmeid: $programmeid
      departmentid: $departmentid
    ) {
      fullName
      total
      session {
        name
      }
      id
      invoiceNumber
      feeDetail {
        feeType {
          name
        }
      }
      matricNumber
    }
  }
`;

export const ALL_ROLE = gql`
  query AllRole {
    allRole {
      roleId
      roleName
    }
  }
`;
export const ALL_PROGRAMME_FOR_COURSE_ASSIGNEMENT_BY_SESSION = gql`
  query AllProgrammeForCourseAssignmentBySession($sessionid: Int!) {
    allProgrammeForCourseAssignmentBySession(sessionid: $sessionid) {
      id
      name
    }
  }
`;
export const ASSIGNED_COURSES = gql`
  query AssignedCourses($sessionid: Int!, $programmeid: Int!) {
    assignedCourses(sessionid: $sessionid, programmeid: $programmeid) {
      id
      name
      code
    }
  }
`;
export const MENU_ROLE_BY_ID = gql`
  query MenuRolebyId($menuroleid: Int!) {
    menuRolebyId(menuroleid: $menuroleid) {
      id
      menu {
        name
      }
      role {
        roleName
      }
    }
  }
`;
export const MENUROLE_BY_ROLEID = gql`
  query MenuRolebyRoleId($roleid: Int!) {
    menuRolebyRoleId(roleid: $roleid) {
      id
      menu {
        name
      }
      role {
        roleName
      }
    }
  }
`;

export const MENUS = gql`
  query Menu {
    menu {
      name
      href
      icon
      current
      dropdowns {
        name
        path
        icon
        current
      }
    }
  }
`;
export const COURSE_ALLOCATION_BY_PROGRAMME_AND_DEPARTMENT = gql`
  query CourseAllocationByProgrammeAndDepartment(
    $departmentid: Int!
    $programmeid: Int!
    $levelid: Int!
  ) {
    courseAllocationByProgrammeAndDepartment(
      departmentid: $departmentid
      programmeid: $programmeid
      levelid: $levelid
    ) {
      user {
        fullName
      }
      assignedBy {
        fullName
      }
      dateAssigned
      id
      session {
        name
      }
      courseAssignment {
        course {
          name
          id
        }
      }
    }
  }
`;

export const CHECK_RESULT = gql`
  query CheckResult($semesterid: Int!, $sessionid: Int!) {
    checkResult(semesterid: $semesterid, sessionid: $sessionid) {
      fullName
      matricNumber
      program
      department
      session
      level
      phoneNumber
      email
      faculty
      courseAssignments {
        courseCode
        title
        unit
        testScore
        examScore
        totalScore
        grade
      }
    }
  }
`;

export const COURSE_TYPE = gql`
  query AllCoursetype {
    allCoursetype {
      id
      courseTypeName
    }
  }
`;

export const COURSE_ASSIGNMENT_BY_PROGRAMME_AND_DEPARTMENT = gql`
  query CourseAssignmentByProgrammeAndDepartment(
    $departmentid: Int!
    $programmeid: Int!
    $levelid: Int!
    $semesterid: Int!
  ) {
    courseAssignmentByProgrammeAndDepartment(
      departmentid: $departmentid
      programmeid: $programmeid
      levelid: $levelid
      semesterid: $semesterid
    ) {
      course {
        code
        id
        name
      }
      courseUnit
      department {
        id
        name
        code
      }
      id
      level {
        id
        name
      }
      programme {
        id
        name
      }
      semester {
        id
        name
      }
    }
  }
`;
export const COURSE_REGISTER = gql`
  query CourseRegister($sessionid: Int!, $semesterid: Int!, $levelid: Int!) {
    courseRegister(
      sessionid: $sessionid
      semesterid: $semesterid
      levelid: $levelid
    ) {
      courseAssignments {
        courseId
        courseName
        courseCode
        courseUnit
        departmentId
        departmentName
        id
        levelId
        levelName
        programmeId
        programmeName
        semesterId
        semesterName
        courseType
        isRegistered
      }
      message
    }
  }
`;
export const ALL_FEE = gql`
  query AllFee {
    allFee {
      amount
      description
      id
      name
    }
  }
`;

export const ALL_FEE_TYPE = gql`
  query AllFeeType {
    allFeeType {
      description
      id
      name
    }
  }
`;

export const ALL_FEE_DETAILS_SETUP_DETAILS_BY_SESSION_AND_FEE_TYPE = gql`
  query AllFeeDetailsSetupDetailsBySessionAndFeeType(
    $feetypeId: Int!
    $sessionId: Int!
  ) {
    allFeeDetailsSetupDetailsBySessionAndFeeType(
      feetypeId: $feetypeId
      sessionId: $sessionId
    ) {
      id
      name
      feeTypeId
      programmeId
      levelId
      paymentModeId
      sessionId
      dateCreated
      departmentIds {
        id
        name
      }
      fees {
        id
        name
        amount
        description
      }
      amount
    }
  }
`;
export const ALL_SEMESTER = gql`
  query AllSemeter {
    allSemeter {
      id
      name
    }
  }
`;
// export const ALL_USER = gql`
//   query AllUser {
//     allUser {
//       userId
//       fullName
//     }
//   }
// `;
export const CHECK_ADMISSION_STATUS = gql`
  query CheckAdmissionStatus($applicationformnumber: String!) {
    checkAdmissionStatus(applicationformnumber: $applicationformnumber) {
      fullName
      status
      courseOfStudy
      applicationFormNumber
      courseOption
      programmeName
      matricNumber
      isAdmitted
      applicantStatus
      applicantStatusId
      payments {
        id
        personId
        paymentTypeId
        paymentModeId
        personTypeId
        paymentSerial
        invoiceNumber
        sessionId
        dateGenerated
        isPaid
        datePaid
        paymentGatewayId
        feeDetail {
          feeType {
            name
            id
          }
        }
      }
      applicationForm {
        applicantAppliedCourse {
          personId
        }
      }
    }
  }
`;

export const GET_ALL_OLEVEL_GRADE = gql`
  query {
    gellAllOLevelGrade {
      description
      id
      name
    }
  }
`;

export const GET_ALL_OLEVEL_SUBJECT = gql`
  query {
    gellAllOLevelSubject {
      description
      id
      isChecked
      name
      rank
    }
  }
`;

export const ALL_STATE = gql`
  query allState {
    allState {
      name
      nationality
      id
    }
  }
`;

export const ALL_ADMISSION_BATCH = gql`
  query allAdmissionBatch {
    allAdmissionBatch {
      name
      id
      description
      active
      slug
    }
  }
`;

export const ALL_DEPARTMENT = gql`
  query AllDepartment {
    allDepartment {
      id
      name
      code
      facultyId
      faculty {
        id
        name
        slug
        description
      }
      active
      slug
    }
  }
`;

export const DEPARTMENT_OPTION = gql`
  query DepartmentOption($departmentOptionId: Int!) {
    departmentOption(departmentOptionId: $departmentOptionId) {
      id
      name
      department {
        id
        name
        code
      }
    }
  }
`;

export const ALL_DEPARTMENTOPTION_BY_DEPARTMENTID = gql`
  query AllDepartmentOptionByDepartmentId($departmentId: Int!) {
    allDepartmentOptionByDepartmentId(departmentId: $departmentId) {
      id
      name
      department {
        id
        name
      }
    }
  }
`;

export const ALL_DEPT_FEE_SETUP = gql`
  query AllDepartment {
    allDepartment {
      id
      name
    }
  }
`;

export const GET_ALL_DEPARTMENT_OPTION_BY_DEPARTMENT_ID = gql`
  query allDepartmentOptionByDepartmentId(
    $departmentId: Int!
    $id: Int!
    $name: String!
  ) {
    allDepartmentOptionByDepartmentId(
      departmentId: $departmentId
      id: $id
      name: $name
    ) {
      departmentId
      id
      name
      department {
        id
        name
        faculty {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_FACULTY = gql`
  query allFaculty {
    allFaculty {
      id
      name
      description
      slug
    }
  }
`;

export const GET_ALL_SESSION = gql`
  query allSession {
    allSession {
      id
      name
      slug
      startDate
      endDate
    }
  }
`;

export const GET_ALL_SET_UP_DONE = gql`
  query allSetUpDone {
    allSetUpDone {
      id
      programmeId
      active
      sessionId
      sessionName
      programmeName
    }
  }
`;

export const ALL_PROGRAMME = gql`
  query AllProgramme {
    allProgramme {
      id
      name
      description
      shortName
      activated
      activeForApllication
      slug
    }
  }
`;
export const DEPARTMENT_BY_PROGRAMME = gql`
  query DepartmentByProgramme($programmeId: Int!) {
    departmentByProgramme(programmeId: $programmeId) {
      id
      name
      code
      facultyId
      active
      slug
    }
  }
`;
export const PROGRAMME_DEPARTMENT = gql`
  query ProgrammeDepartment($programmeId: Int!) {
    programmeDepartment(programmeId: $programmeId) {
      id
      programmeId
      programme {
        id
        name
        description
        shortName
        activated
        activeForApllication
        slug
      }
      departmentId
      department {
        id
        name
        code
        facultyId
        faculty {
          id
          name
          slug
          description
        }
        active
        slug
      }
      active
      activeForApplication
    }
  }
`;
export const ALL_PAYMENT_MODE = gql`
  query AllPaymentMode {
    allPaymentMode {
      id
      payment_Mode_Description
      payment_Mode_Name
      slug
    }
  }
`;

export const GET_ALL_PROGRAMME_SESSION = gql`
  query allProgrammeSession {
    allProgrammeSession {
      id
      sessionId
      programmeId
      programme {
        id
        name
        activated
        activeForApllication
      }
      session {
        id
        name
      }
      activated
      activeForAllocation
      activeForApplication
      activeForFees
      activeForHostel
      activeForResult
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query allPages($programmeId: Int!, $sessionId: Int!) {
    allPages(programmeId: $programmeId, sessionId: $sessionId) {
      pageName
      programmeId
      pageId
      programmeId
      programmeName
      sessionId
      sessionName
    }
  }
`;

export const GET_ALL_SECTIONS = gql`
  query allSections($programmeId: Int!, $sessionId: Int!) {
    allSections(programmeId: $programmeId, sessionId: $sessionId) {
      sectionName
      programmeId
      pageId
      programmeId
      programmeName
      sessionId
      sessionName
      sectionId
    }
  }
`;

export const INVOICE = gql`
  query Invoice($invoicenumber: String!) {
    invoice(invoicenumber: $invoicenumber) {
      fullName
      invoiceNumber
      datePaid
      email
      phone
      total
      id
      programmeName
      departmentName
      paymentType {
        paymentTypeName
      }
      feeDetail {
        fees {
          amount
          description
          id
          name
        }
        feeType {
          name
          description
        }
        feeTypeId
        session {
          name
        }
        level {
          id
          name
        }
      }
      paystackRedirectUrl
      matricNumber
      facultyName
      dateGenerated
    }
  }
`;

export const ALL_LEVEL = gql`
  query AllLevel {
    allLevel {
      description
      id
      name
    }
  }
`;

export const OLEVEL_GRADE = gql`
  query oLevelGrade($id: id) {
    oLevelGrade(id: $id) {
      description
      id
      name
    }
  }
`;

export const AMOUNT_FOR_PROGRAMME = gql`
  query Query($programmeId: Int!, $departmentId: Int!) {
    amountForProgrammeDept(
      programmeId: $programmeId
      departmentId: $departmentId
    )
  }
`;

export const OLEVEL_SUBJECT = gql`
  query oLevelSubject($id: id) {
    oLevelSubject(id: $id) {
      description
      id
      isChecked
      name
      rank
    }
  }
`;

export const PREVIEW = gql`
  query preview($programmeId: Int!, $sessionId: Int!) {
    preview(programmeId: $programmeId, sessionId: $sessionId) {
      mainPages {
        pageName
        pageId
        programmeName
        programmeId
        sessionId
        sessionName
        sections {
          sectionName
          sectionId
          fieldDetails {
            id
            dynamicFormPageSectionSetupId
            errorMessage
            input_type
            label
            list
            required
            response
            dynamicFormPageSectionSetup {
              active
              dynamicFormPageSetupId
              id
              name
              dynamicFormPageSetup {
                active
                dynamicFormProgrammeAndSessionSetupId
                id
                name
                dynamicFormProgrammeAndSessionSetup {
                  active
                  id
                  programmeId
                  sessionId
                  programme {
                    activated
                    activeForApllication
                    description
                    id
                    name
                    shortName
                    slug
                  }
                  session {
                    id
                    activated
                    activeForResult
                    activeForAllocation
                    activeForApplication
                    activeForHostel
                    activeForFees
                    endDate
                    startDate
                    slug
                    name
                  }
                }
              }
            }
          }
        }
      }
      olevelResultCombination {
        centerName
        centerCode
        examCode
        examNumber
        examYear
        meetsCriteria
        olevelType
        olevelTypeId
        scannedCopyUrl
        scratchCardPin
        olevelResultCombinationDetails {
          dateCreated
          grade
          gradeDesc
          subject
        }
      }
    }
  }
`;

export const GET_ALL_OLEVEL_TYPE = gql`
  query {
    gellAllOLevelType {
      id
      name
      shortName
      description
    }
  }
`;
export const CHECK_STUDENT_BIO = gql`
  query CheckStudentBio {
    checkStudentBio {
      fullName
      status
      courseOfStudy
      applicationFormNumber
      courseOption
      programmeName
      applicationForm {
        id
        formNumber
      }
      matricNumber
      isAdmitted
      payments {
        person {
          passportUrl
        }
      }
      session
      level
    }
  }
`;

export const RECEIPT = gql`
  query Receipt($invoicenumber: String!) {
    receipt(invoicenumber: $invoicenumber) {
      fullName
      feeDetail {
        fees {
          name
          id
          amount
          description
        }
        department {
          name
          id
        }
        session {
          name
        }
        id
        departmentId
        feeType {
          name
          id
          description
        }
        feeTypeId
        level {
          id
          name
        }
        levelId
        paymentMode {
          payment_Mode_Name
        }
        programme {
          name
          id
        }
        sessionId
        programmeId
        active
      }
      datePaid
      invoiceNumber
      total
      session {
        name
        id
      }
      programmeName
      sessionId
      departmentName
      id
      matricNumber
      applicantStatus
      applicantStatusId
      facultyName
      paymentSerial
      paymentMode {
        payment_Mode_Name
      }
      paymentType {
        paymentTypeName
      }
    }
  }
`;

export const STUDENT_PROFILE = gql`
  query StudentProfile {
    studentProfile {
      passportUrl
      faculty
      programmeName
      courseOption
      courseOfStudy
      matricNumber
      phoneNumber
      address
      email
      fullName
      level
    }
  }
`;

export const VIEW_REGISTERED_COURSES = gql`
  query ViewCoursesRegistered(
    $sessionid: Int!
    $semesterid: Int!
    $levelid: Int!
  ) {
    viewCoursesRegistered(
      sessionid: $sessionid
      semesterid: $semesterid
      levelid: $levelid
    ) {
      matricNumber
      status
      fullName
      session {
        name
      }
      semester {
        name
        id
      }
      courseOfStudy
      courseOption
      programmeName
      courseAssignments {
        courseName
        levelName
        levelId
        courseId
        courseCode
        courseUnit
        courseType
      }
    }
  }
`;

export const UNADMITTED_APPLICANTS = gql`
  query UnadmittedApplicants(
    $programmeid: Int!
    $departmentid: Int!
    $sessionid: Int!
  ) {
    unadmittedApplicants(
      programmeid: $programmeid
      departmentid: $departmentid
      sessionid: $sessionid
    ) {
      admissionBatchId
      admissionBatchName
      admissionListId
      applicantionFormNumber
      applicationFormId
      departmentId
      departmentName
      departmentOptionId
      departmentOptionName
      personId
      personName
      programmeId
      programmeName
      sessionId
      sessionName
    }
  }
`;

export const UPLOAD_SHEET = gql`
  query UploadSheet($sessionid: Int!, $courseId: Int!) {
    uploadSheet(sessionid: $sessionid, courseId: $courseId) {
      courseAssignment {
        course {
          name
          code
          id
        }
        department {
          name
        }
        programme {
          name
          id
        }
        level {
          id
          name
        }
        semester {
          id
          name
        }
        courseUnit
      }
      resultDetails {
        matriculationNumber
        quiz1
        quiz2
        quiz3
        quiz4
        quiz5
        quiz6
        quiz7
        quiz8
        quiz9
        exam
        courseCode
      }
    }
  }
`;

export const ALL_PROGRAMME_DEPARTMENT = gql`
  query AllProgrammeDepartment($programmeid: Int!) {
    allProgrammeDepartment(programmeid: $programmeid) {
      totalSessions
      programmeId
      id
      departmentId
      active
      activeForApplication
      department {
        name
        id
      }
      programme {
        id
        name
      }
    }
  }
`;

export const ALL_PROGRAMME_SESSION = gql`
  query AllProgrammeSessionByProgramme($programmeid: Int!) {
    allProgrammeSessionByProgramme(programmeid: $programmeid) {
      id
      programmeId
      programme {
        name
        id
      }
      sessionId
      session {
        name
        id
      }
      activeForResult
      activeForAllocation
      activeForApplication
      activeForHostel
      activeForFees
      activated
    }
  }
`;
export const PROGRAMME_NAME = gql`
  query Programme($programmeid: Int!) {
    programme(programmeid: $programmeid) {
      id
      name
    }
  }
`;

export const VIEWALLTIMETABLESTUDENTS = gql`
  query ViewAllTimeTableStudents {
    viewAllTimeTableStudents {
      id
      userId
      startTime
      endTime
      isReOccuring
      dayOfTheWeek

      courseAssignment {
        id
        course {
          id
          name
        }

        courseType {
          id
          courseTypeName
        }
      }
      classDescription
      classRequirement
      venue
      assignments
    }
  }
`;

export const VIEW_ALL_TIMETABLE_USERS = gql`
  query ViewAllTimeTableUsers {
    viewAllTimeTableUsers {
      id
      user {
        userId
        userName
        fullName
      }
      startTime
      endTime
      isReOccuring
      dayOfTheWeek

      classDescription
      classRequirement
      venue
      courseAssignment {
        course {
          name
        }
      }
    }
  }
`;

export const VIEW_ALL_TIMETABLE = gql`
  query ViewAllTimeTable {
    viewAllTimeTable {
      id
      user {
        userId
        userName
        fullName
      }
      startTime
      endTime
      isReOccuring
      dayOfTheWeek
      programme {
        id
        name
      }
      courseAssignment {
        id
        course {
          id
          name
        }
        semester {
          id
          name
        }
        courseType {
          id
          courseTypeName
        }
      }
      classDescription
      classRequirement
      venue
      assignments
    }
  }
`;

export const COURSE_ALLOCATION_BY_USER = gql`
  query CourseAllocationByUser {
    courseAllocationByUser {
      id
      courseAssignmentId
      courseAssignment {
        course {
          name
          id
        }
      }
    }
  }
`;

export const PRINT_COURSE_REG = gql`
  query PrintCourseForm($printCourseFormId: Long!) {
    printCourseForm(id: $printCourseFormId) {
      fullName
      matricNo
      level
      semester
      programme
      department
      faculty
      session
      courseRegData {
        courseName
        courseCode
        courseUnit
        courseType
        isRegistered
      }
    }
  }
`;

export const VIEW_NOTIFICATIONS_BY_STUDENTS = gql`
  query ViewNotificationsByStudent {
    viewNotificationsByStudent {
      id
      userId
      title
      description
      dateCreated
      isReOccuring
      startTime
      endTime
      user {
        fullName
      }
    }
  }
`;

export const VIEW_ALL_NOTIFICATIONS = gql`
  query ViewAllNotifications {
    viewAllNotifications {
      id
      userId
      title
      description
      dateCreated
      isReOccuring
      startTime
      endTime
      user {
        fullName
      }
    }
  }
`;

export const VIEW_ALL_PREFIX = gql`
  query AllApplicationFormNumberSetup {
    allApplicationFormNumberSetup {
      id
      applicationNumberPrefix
      programmeId
      programme {
        name
      }
    }
  }
`;

export const ALL_USER = gql`
  query AllUser {
    allUser {
      userId
      userName
      email
      fullName
      password
      created
      lastChangedPassword
      lastLogin
      role {
        roleId
        roleName
      }
      signatureUrl
      passportUrl
    }
  }
`;

export const ALL_GRADES = gql`
  query AllGrades {
    allGrades {
      id
      gradeValue
      gradeWeight
      lowestNo
      highestNo
      sessionId
      gradeDescription
    }
  }
`;

export const ALL_HOSTEL_TYPES = gql`
  query AllHostelTypes {
    allHostelTypes {
      id
      hostel_Type_Name
      hostel_Type_Description
    }
  }
`;

export const ALL_HOSTEL = gql`
  query AllHostels {
    allHostels {
      id
      name
      description
      capacity
      hostelType {
        hostel_Type_Name
        id
      }
    }
  }
`;

export const ALL_HOSTEL_SERIES = gql`
  query AllHostelSeries {
    allHostelSeries {
      id
      name
      hostel {
        id
        name
        capacity
        hostelType {
          id
          hostel_Type_Name
        }
      }
    }
  }
`;

export const ALL_HOSTEL_ROOMS = gql`
  query AllHostelRooms {
    allHostelRooms {
      id
      number
      reserved
      series {
        id
        name
      }
      hostel {
        id
        name
      }
      corners
      roomCapacity
    }
  }
`;
