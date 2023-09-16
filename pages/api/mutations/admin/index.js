import { gql, useMutation } from "@apollo/client";

export const ADMISSION_LIST_DTO_NAMES = gql`
  mutation AdmissionListDtoNames($admissionlistformnumber: [String!]!) {
    admissionListDtoNames(admissionlistformnumber: $admissionlistformnumber) {
      programmeId
      departmentId
      sessionId
      departmentOptionId
      applicationFormId
      admissionListId
      applicantionFormNumber
      programmeName
      departmentName
      sessionName
      personName
      personId
      admissionBatchId
      admissionBatchName
      departmentOptionName
    }
  }
`;

export const ADMITTED_APPLICANT = gql`
  mutation AdmittedApplicant($admittedAplicantDto: AdmittedAplicantDtoInput!) {
    admittedApplicant(admittedAplicantDto: $admittedAplicantDto)
  }
`;

export const ACTIVATE_FORM = gql`
  mutation activateForm($id: Long!, $programmeid: Int!, $toggle: Boolean!) {
    activateForm(id: $id, programmeid: $programmeid, toggle: $toggle) {
      success
      message
    }
  }
`;

export const APPLY_FEE_DETAIL = gql`
  mutation ApplyFeeDetail($feedetailsetupId: Int!, $sessionId: Int!) {
    applyFeeDetail(feedetailsetupId: $feedetailsetupId, sessionId: $sessionId)
  }
`;

export const SAVE_ADMISSION_BATCH = gql`
  mutation saveAdmissionBatch($description: String!, $name: String!) {
    saveAdmissionBatch(description: $description, name: $name) {
      active
      description
      id
      name
      slug
    }
  }
`;

export const APPLICATION_SETUP = gql`
  mutation staffLogin($username: String!, $password: String!) {
    staffLogin(username: $username, password: $password) {
      userId
      username
      role
      authToken
      fullName
      passportUrl
    }
  }
`;
export const CHANGE_PROGRAMME_OR_DEPARTMENT_ADMISSION = gql`
  mutation ChangeProgrammeOrDepartmentAdmission(
    $changeProgrammeOrDepartmentAdmissionId: Int!
    $programmeId: Int!
    $departmentId: Int!
  ) {
    changeProgrammeOrDepartmentAdmission(
      id: $changeProgrammeOrDepartmentAdmissionId
      programmeId: $programmeId
      departmentId: $departmentId
    )
  }
`;

export const DELETE_ABILITY = gql`
  mutation deleteAbility($id: int!) {
    deleteAbility(id: $id) {
      id
    }
  }
`;
export const DELETE_APPLICATION_FORMNUMBERSETUP = gql`
  mutation DeleteApplicationFormNumberSetup(
    $deleteApplicationFormNumberSetupId: Int!
  ) {
    deleteApplicationFormNumberSetup(id: $deleteApplicationFormNumberSetupId)
  }
`;
export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($id: Int!) {
    deleteDepartment(id: $id)
  }
`;
export const DELETE_DEPARTMENT_OPTION = gql`
  mutation DeleteDepartmentOption($deleteDepartmentOptionId: Int!) {
    deleteDepartmentOption(id: $deleteDepartmentOptionId)
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($id: Int!) {
    deleteSession(id: $id)
  }
`;

export const DELETE_FACULTY = gql`
  mutation DeleteFaculty($deleteFacultyId: Int!) {
    deleteFaculty(id: $deleteFacultyId)
  }
`;

export const DELETE_FEETYPE = gql`
  mutation DeleteFeeType($deleteFeeTypeId: Int!) {
    deleteFeeType(id: $deleteFeeTypeId)
  }
`;

export const DELETE_FEE = gql`
  mutation DeleteFee($deleteFeeId: Int!) {
    deleteFee(id: $deleteFeeId)
  }
`;

export const UPDATE_FEE = gql`
  mutation UpdateFee($updateFeeId: Int!, $name: String!, $amount: Decimal!) {
    updateFee(id: $updateFeeId, name: $name, amount: $amount) {
      id
    }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($deleteMenuId: Int!) {
    deleteMenu(id: $deleteMenuId)
  }
`;
export const DELETE_MENU_GROUP = gql`
  mutation DeleteMenuGroup($deleteMenuGroupId: Int!) {
    deleteMenuGroup(id: $deleteMenuGroupId)
  }
`;
export const DELETE_MENU_IN_ROLE = gql`
  mutation DeleteMenuInRole($deleteMenuInRoleId: Int!) {
    deleteMenuInRole(id: $deleteMenuInRoleId)
  }
`;
export const DELETE_PROGRAMME = gql`
  mutation deleteProgramme($id: Int!) {
    deleteProgramme(id: $id)
  }
`;
export const DELETE_PROGRAMME_DEPARTMENT = gql`
  mutation DeleteProgrammeDepartment($programmedepartmentid: Int!) {
    deleteProgrammeDepartment(programmedepartmentid: $programmedepartmentid)
  }
`;
export const DISABLE_ADMISSION = gql`
  mutation DisableAdmission($disableAdmissionId: Int!) {
    disableAdmission(id: $disableAdmissionId)
  }
`;
export const GENERATE_APPLICATION_INVOICE = gql`
  mutation generateApplicationInvoice(
    $programmeId: Int!
    $departmentId: Int!
    $departmentOptions: Int
    $formtypeid: Int!
    $biodata: [BiodataInput!]!
  ) {
    generateApplicationInvoice(
      formtypeid: $formtypeid
      programmeId: $programmeId
      departmentId: $departmentId
      departmentOptions: $departmentOptions
      biodata: $biodata
    )
  }
`;

export const GENERATE_STUDENT_INVOICE = gql`
  mutation GenerateStudentInvoice(
    $levelId: Int!
    $sessionId: Int!
    $feetypeId: Int!
    $paymentMode: Int!
  ) {
    generateStudentInvoice(
      levelId: $levelId
      sessionId: $sessionId
      feetypeId: $feetypeId
      paymentMode: $paymentMode
    ) {
      id
      paymentType {
        paymentTypeName
        id
      }
      invoiceNumber
      sessionId
      dateGenerated
      isPaid
      datePaid
      paymentGateway {
        name
        id
      }
      feeDetail {
        id
        feeType {
          id
          name
        }
        level {
          id
          name
        }
        department {
          id
          name
        }
        fees {
          id
          name
          amount
        }
      }
    }
  }
`;

export const GENERATE_INVOICE = gql`
  mutation GenerateInvoice(
    $personId: Long!
    $levelId: Int!
    $sessionId: Int!
    $feetypeId: Int!
    $paymentMode: Int!
  ) {
    generateInvoice(
      personId: $personId
      levelId: $levelId
      sessionId: $sessionId
      feetypeId: $feetypeId
      paymentMode: $paymentMode
    ) {
      id
      invoiceNumber
      person {
        biodata {
          name
        }
      }
      dateGenerated
      paystackredirectUrl
    }
  }
`;

export const SAVE_ABILITY = gql`
  mutation saveAbility($name: String!) {
    saveAbility(name: $name) {
      id
    }
  }
`;

export const SAVE_ADMISSION_CRITERIA = gql`
  mutation saveAdmissionCriteria($newCriteiaDto: AddAdmissionCriteraDtoInput!) {
    saveAdmissionCriteria(newCriteiaDto: $newcriteiaDto) {
      id
    }
  }
`;

export const SAVE_APPLICATIONFORMNUMBER_SETUP = gql`
  mutation SaveApplicationFormNumberSetup(
    $applicationNumberPrefix: String!
    $programmeId: Int!
  ) {
    saveApplicationFormNumberSetup(
      applicationNumberPrefix: $applicationNumberPrefix
      programmeId: $programmeId
    ) {
      applicationNumberPrefix
      id
      programme {
        id
        name
        activeForApllication
      }
      isActive
    }
  }
`;
export const SAVE_COURSE = gql`
  mutation Mutation($name: String!, $code: String!) {
    saveCourse(name: $name, code: $code) {
      id
      name
      code
      slug
      activated
    }
  }
`;
export const SAVE_COURSE_ALLOCATION = gql`
  mutation SaveCourseAllocation(
    $courseassignmentid: Long!
    $assigneeId: Long!
    $sessionid: Int!
  ) {
    saveCourseAllocation(
      courseassignmentid: $courseassignmentid
      assigneeId: $assigneeId
      sessionid: $sessionid
    ) {
      id
      dateAssigned
    }
  }
`;

export const SAVE_COURSESASSIGNMENT = gql`
  mutation SaveCourseAssignmentAssignment(
    $courseid: Int!
    $departmentid: Int!
    $programmeid: Int!
    $courseunit: Int!
    $levelid: Int!
    $semesterid: Int!
  ) {
    saveCourseAssignmentAssignment(
      courseid: $courseid
      departmentid: $departmentid
      programmeid: $programmeid
      courseunit: $courseunit
      levelid: $levelid
      semesterid: $semesterid
    ) {
      id
      courseId
      course {
        name
        code
      }
      departmentId
      department {
        name
        code
      }
      programmeId
      programme {
        name
      }
      levelId
      level {
        name
      }
      semesterId
      semester {
        name
      }
      courseUnit
      activated
    }
  }
`;

export const SAVE_COURSESASSIGNMENT_BULK = gql`
  mutation SaveCourseAssignmentBulk(
    $departmentid: Int!
    $programmeid: Int!
    $levelid: Int!
    $semesterid: Int!
    $createbulkcoursesassignment: [CreateBulkDtoInput!]!
  ) {
    saveCourseAssignmentBulk(
      departmentid: $departmentid
      programmeid: $programmeid
      levelid: $levelid
      semesterid: $semesterid
      createbulkcoursesassignment: $createbulkcoursesassignment
    ) {
      noUploaded
      failedItems {
        courseid
        courseunit
        coursetype
      }
      failedCount
    }
  }
`;

export const SAVE_STUDENT_COURSE_REGISTER = gql`
  mutation SaveStudentCourseReg(
    $sessionid: Int!
    $semesterid: Int!
    $coursereg: [CourseAssignmentsDTOInput!]!
  ) {
    saveStudentCourseReg(
      sessionid: $sessionid
      semesterid: $semesterid
      coursereg: $coursereg
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
        isRegistered
      }
      dateSubmitted
    }
  }
`;
export const SAVE_DEPARTMENT = gql`
  mutation SaveDepartment(
    $name: String!
    $facultyid: Int!
    $deptCode: String!
  ) {
    saveDepartment(name: $name, facultyid: $facultyid, deptCode: $deptCode) {
      id
      name
      code
      faculty {
        id
        name
      }
    }
  }
`;
export const SAVE_DEPARTMENT_OPTION = gql`
  mutation saveDepartmentOption($name: String!, $departmentId: Int!) {
    saveDepartmentOption(name: $name, departmentId: $departmentId) {
      id
    }
  }
`;
export const SAVE_FACULTY = gql`
  mutation saveFaculty($name: String!, $description: String!) {
    saveFaculty(name: $name, description: $description) {
      id
      name
    }
  }
`;
export const SAVE_FEE = gql`
  mutation SaveFee($name: String!, $amount: Decimal!, $description: String!) {
    saveFee(name: $name, amount: $amount, description: $description) {
      amount
      description
      id
      name
    }
  }
`;

export const SAVE_FEE_TYPE = gql`
  mutation SaveFeeType($name: String!, $description: String!) {
    saveFeeType(name: $name, description: $description) {
      description
      id
      name
    }
  }
`;

export const SAVE_FEE_DETAIL = gql`
  mutation SaveFeeDetail($model: FeeDetailsDtoInput!) {
    saveFeeDetail(model: $model)
  }
`;
export const SAVE_MENU = gql`
  mutation SaveMenu(
    $name: String!
    $action: String!
    $controller: String!
    $menugroupid: Int!
    $icon: String!
  ) {
    saveMenu(
      name: $name
      action: $action
      controller: $controller
      menugroupid: $menugroupid
      icon: $icon
    ) {
      icon
      id
      name
      path
    }
  }
`;
export const SAVE_MENU_GROUP = gql`
  mutation SaveMenuGroup($name: String!, $icon: String!) {
    saveMenuGroup(name: $name, icon: $icon) {
      icon
      id
      name
      href
    }
  }
`;
export const SAVE_MENU_IN_ROLE = gql`
  mutation SaveMenuInRole($menuid: Long!, $roleid: Int!) {
    saveMenuInRole(menuid: $menuid, roleid: $roleid) {
      id
    }
  }
`;

export const SAVE_PROGRAMME = gql`
  mutation saveProgramme($name: String!, $description: String!) {
    saveProgramme(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const SAVE_PROGRAMME_SESSION = gql`
  mutation saveProgrammeSession($programmeid: Int!, $sessionId: Int!) {
    saveProgrammeSession(programmeid: $programmeid, sessionId: $sessionId) {
      programmeId
      sessionId
      programme {
        id
        name
      }
      session {
        id
        name
      }
    }
  }
`;

export const SAVE_PROGRAMME_DEPARTMENT = gql`
  mutation SaveProgrammeDepartment($programmeid: Int!, $departmentid: Int!) {
    saveProgrammeDepartment(
      programmeid: $programmeid
      departmentid: $departmentid
    ) {
      id
    }
  }
`;
export const SAVE_STUDENT_RESULT = gql`
  mutation SaveStudentResult(
    $result: [ResultDetailsInput!]!
    $sessionid: Int!
  ) {
    saveStudentResult(result: $result, sessionid: $sessionid)
  }
`;
export const SAVE_SESSION = gql`
  mutation saveSession(
    $name: String!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    saveSession(name: $name, startDate: $startDate, endDate: $endDate) {
      id
    }
  }
`;
export const SUBMIT_APPLICATION_FORM = gql`
  mutation submitApplicationForm(
    $responseDetails: ApplicationFormResponseInput!
    $olevelResultCombination: OlevelResultCombinationInput!
    $applicantAppliedCourseId: Int!
  ) {
    submitApplicationForm(
      responseDetails: $responseDetails
      olevelResultCombination: $olevelResultCombination
      applicantAppliedCourseId: $applicantAppliedCourseId
    ) {
      id
    }
  }
`;
export const UPDATE_ABILITY = gql`
  mutation updateAbility($id: Int!, $name: String!) {
    updateAbility(id: $id, name: $name) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_FOR_ALLOCATION = gql`
  mutation updateActiveForAllocation($id: Int!) {
    updateActiveForAllocation(id: $id) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_FOR_APPLICATION = gql`
  mutation updateActiveForApplication($id: Int!) {
    updateActiveForApplication(id: $id) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_FOR_FEES = gql`
  mutation updateActiveForFees($id: Int!) {
    updateActiveForFees(id: $id) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_FOR_HOSTEL = gql`
  mutation updateActiveForHostel($id: Int!) {
    updateActiveForHostel(id: $id) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_FOR_RESULT = gql`
  mutation updateActiveForResult($id: Int!) {
    updateActiveForResult(id: $id) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_SESSION = gql`
  mutation updateActiveSession($id: Int!) {
    updateActiveSession(id: $id) {
      id
    }
  }
`;

export const UPDATE_ACTIVE_FOR_ALLOCATION_PROGRAMME_SESSION = gql`
  mutation updateActiveForAllocationProgrammeSession(
    $id: Int!
    $toggle: Boolean!
  ) {
    updateActiveForAllocationProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;

export const UPDATE_ACTIVATE_PROGRAMME_SESSION = gql`
  mutation updateActivateProgrammeSession($id: Int!, $toggle: Boolean!) {
    updateActivateProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;

export const UPDATE_ACTIVE_FOR_APPLICATION_PROGRAMME_SESSION = gql`
  mutation updateActiveForApplicationProgrammeSession(
    $id: Int!
    $toggle: Boolean!
  ) {
    updateActiveForApplicationProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;

export const UPDATE_ACTIVE_FOR_FEES_PROGRAMME_SESSION = gql`
  mutation updateActiveForFeesProgrammeSession($id: Int!, $toggle: Boolean!) {
    updateActiveForFeesProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;

export const UPDATE_ACTIVE_FOR_HOSTEL_PROGRAMME_SESSION = gql`
  mutation updateActiveForHostelProgrammeSession($id: Int!, $toggle: Boolean!) {
    updateActiveForHostelProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation UpdateMenu(
    $updateMenuId: Int!
    $name: String!
    $action: String!
    $controller: String!
    $menugroupid: Int!
  ) {
    updateMenu(
      id: $updateMenuId
      name: $name
      action: $action
      controller: $controller
      menugroupid: $menugroupid
    ) {
      id
    }
  }
`;

export const UPDATE_ACTIVE_FOR_RESULT_PROGRAMME_SESSION = gql`
  mutation updateActiveForResultProgrammeSession($id: Int!, $toggle: Boolean!) {
    updateActiveForResultProgrammeSession(id: $id, toggle: $toggle) {
      id
      sessionId
    }
  }
`;
export const UPDATE_APPLICATION_FORM_NUMBER_SETUP = gql`
  mutation updateApplicationFormNumberSetup(
    $id: Int!
    $applicationNumberPrefix: String!
    $programmeId: Int!
  ) {
    updateApplicationFormNumberSetup(
      id: $id
      applicationNumberPrefix: $applicationNumberPrefix
      programmeId: $programmeId
    ) {
      id
    }
  }
`;
export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment(
    $updateDepartmentId: Int!
    $name: String!
    $facultyId: Int!
  ) {
    updateDepartment(
      id: $updateDepartmentId
      name: $name
      facultyId: $facultyId
    ) {
      id
      name
      code
      faculty {
        id
        name
      }
    }
  }
`;

export const UPDATE_DEPARTMENT_OPTION = gql`
  mutation UpdateDepartmentOption(
    $updateDepartmentOptionId: Int!
    $name: String!
  ) {
    updateDepartmentOption(id: $updateDepartmentOptionId, name: $name) {
      id
    }
  }
`;
export const UPDATE_SESSION = gql`
  mutation updateSession(
    $name: String!
    $id: Int!
    $enddate: DateTime
    $startdate: DateTime
  ) {
    updateSession(
      id: $id
      name: $name
      enddate: $enddate
      startdate: $startdate
    ) {
      id
    }
  }
`;
export const UPDATE_FACULTY = gql`
  mutation UpdateFaculty(
    $updateFacultyId: Int!
    $name: String!
    $description: String!
  ) {
    updateFaculty(
      id: $updateFacultyId
      name: $name
      description: $description
    ) {
      id
      name
      description
    }
  }
`;
export const UPDATE_FEETYPE = gql`
  mutation UpdateFeeType($updateFeeTypeId: Int!, $name: String!) {
    updateFeeType(id: $updateFeeTypeId, name: $name) {
      id
    }
  }
`;

export const UPDATE_PROGRAMME = gql`
  mutation updateProgramme($id: Int!, $name: String!, $description: String!) {
    updateProgramme(id: $id, name: $name, description: $description) {
      id
      name
    }
  }
`;
export const UPDATE_APPLICATION_FORMNUMBERSETUP = gql`
  mutation UpdateApplicationFormNumberSetup(
    $updateApplicationFormNumberSetupId: Int!
    $applicationNumberPrefix: String!
  ) {
    updateApplicationFormNumberSetup(
      id: $updateApplicationFormNumberSetupId
      applicationNumberPrefix: $applicationNumberPrefix
    ) {
      applicationNumberPrefix
      id
      isActive
      programme {
        id
        name
        activeForApllication
      }
    }
  }
`;
export const SAVE_DYNAMIC_FORM_SETUP = gql`
  mutation saveDynamicFormSetUp($model: ApplicationFormDynamicSetupDtoInput!) {
    saveDynamicFormSetUp(model: $model) {
      active
      createdOn
    }
  }
`;

export const SAVE_DYNAMIC_PROGRAMME_AND_SESSION = gql`
  mutation saveDynamicProgrammeAndPageSetup(
    $model: DynamicFormProgrammeAndSessionSetupDtoInput!
  ) {
    saveDynamicProgrammeAndPageSetup(model: $model) {
      message
      success
    }
  }
`;

export const SAVE_DEPARTMENTOPTION = gql`
  mutation SaveDepartmentOption($name: String!, $departmentId: Int!) {
    saveDepartmentOption(name: $name, departmentId: $departmentId) {
      id
      name
    }
  }
`;

export const SAVE_FORM_SECTION = gql`
  mutation saveDynamicFormSections(
    $model: DynamicFormPageSectionSetupDtoInput!
  ) {
    saveDynamicFormSections(model: $model) {
      message
      success
    }
  }
`;

export const SAVE_DYNAMIC_FORM_FiELD_DETAILS = gql`
  mutation saveDynamicFormFieldDetails(
    $model: DynamicFormFieldDetailsDtoInput!
  ) {
    saveDynamicFormFieldDetails(model: $model) {
      message
      success
    }
  }
`;

export const DELETE_FORM = gql`
  mutation deleteForms($formid: Long!) {
    deleteForms(formid: $formid) {
      message
      success
    }
  }
`;

export const CREATE_PROGRAMME_SESSION = gql`mutation CreateProgrammeSession($sessionId: Int!, $programmeid: Int!, $activeforhostel: Boolean!, $activated: Boolean!, $activeforfees: Boolean!, $activeforallocation: Boolean!, $activeforapplication: Boolean!, $activeforresult: Boolean!) {
  createProgrammeSession(sessionId: $sessionId, programmeid: $programmeid, activeforhostel: $activeforhostel, activated: $activated, activeforfees: $activeforfees, activeforallocation: $activeforallocation, activeforapplication: $activeforapplication, activeforresult: $activeforresult) {
    activated
    activeForAllocation
    activeForApplication
    activeForFees
    activeForHostel
    activeForResult
    id
    programmeId
    sessionId
    programme {
      name
      id
    }
    session {
      id
      name
    }
  }
}`;
export const UPDATE_PROGRAMME_SESSION_NEW = gql`mutation UpdateAllProgrammeSession($updateAllProgrammeSessionId: Int!, $activeforhostel: Boolean!, $activated: Boolean!, $activeforfees: Boolean!, $activeforallocation: Boolean!, $activeforapplication: Boolean!, $activeforresult: Boolean!) {
  updateAllProgrammeSession(id: $updateAllProgrammeSessionId, activeforhostel: $activeforhostel, activated: $activated, activeforfees: $activeforfees, activeforallocation: $activeforallocation, activeforapplication: $activeforapplication, activeforresult: $activeforresult) {
    activated
    activeForAllocation
    activeForApplication
    activeForFees
    activeForHostel
    activeForResult
    id
    programmeId
    sessionId
  }
}`;

export const DELETE_PROGRAMME_SESSION = gql`mutation DeleteProgrammeSession($deleteProgrammeSessionId: Int!) {
  deleteProgrammeSession(id: $deleteProgrammeSessionId)
}`;

export const SAVE_PROGRAMME_DEPARTMENT_NEW = gql`mutation SaveProgrammeDepartment($programmeid: Int!, $departmentid: Int!, $sessionduration: Int!) {
  saveProgrammeDepartment(programmeid: $programmeid, departmentid: $departmentid, sessionduration: $sessionduration) {
    active
    id
    departmentId
    activeForApplication
    programmeId
    totalSessions
  }
}`;
export const DELETE_PROGRAMME_DEPARTMENT_NEW = gql`mutation DeleteProgrammeDepartment($programmedepartmentid: Int!) {
  deleteProgrammeDepartment(programmedepartmentid: $programmedepartmentid)
}`;
