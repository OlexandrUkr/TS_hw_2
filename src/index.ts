class School {
    private _areas: string[] = [];
    private _lecturers: {
      lecturerId: number;
      name: string;
      surname: string;
      position: string
      company: string;
      experience: string;
      courses: string[];
      contacts: string[];
    }[] = []; 

    get areas(): string[] {
      return this._areas;
    }
  
    get lecturers(): {
      lecturerId: number;
      name: string;
      surname: string;
      position: string
      company: string;
      experience: string;
      courses: string[];
      contacts: string[];
    }[] {
      return this._lecturers;
    }

    addArea(area: string): void {
      this._areas.push(area);
    }

    removeArea(areaId: number): void {
      this._areas.splice(areaId, 1);
    }

    addLecturer(lecturer: {
      lecturerId: number;
      name: string;
      surname: string;
      position: string
      company: string;
      experience: string;
      courses: string[];
      contacts: string[];
    }): void {
      this._lecturers.push(lecturer);
    }

    removeLecturer(lecturerId: number) {
      this._lecturers.splice(lecturerId, 1);
    }
  }
  
  class Area {
    private _levels: string[] = [];
    private _name: string;
  
    constructor(name: string) {
      this._name = name;
    }

    get levels(): string[] {
      return this._levels
    }

    get name(): string {
      return this._name
    }

    addLevel(level: string): void {
      this._levels.push(level);
    }

    removeLevel(level: string): void {
      this._levels = this._levels.filter((_levels) => _levels !== level)
    }
  }
  
  enum Description {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
  }

  class Level {
    private _groups: string[] = [];
    private _name: string;
    private _description: Description;
  
    constructor(name: string, description: Description) {
      this._name = name;
      this._description = description;
    }

    get groups(): string[] {
      return this._groups
    }

    get name(): string {
      return this._name
    }
    
    get description(): string {
      return this._description
    }

    addGroup(group: string): void {
      this._groups.push(group);
    }

    removeGroup(group: string): void {
      this._groups = this._groups.filter((_groups) => _groups !== group)
    }    
  }
  
  enum LevelName {
    FIRST,
    SECOND,
  }

  enum StatusGroup {
    LOW = 1,
    MIDDLE = 2,
    HIGH = 3,
  }

  class Group {
    directionName: string;
    levelName: LevelName;
    private _area: string;
    private _status: StatusGroup;
    private _students: Student[] = [];
  
    constructor(directionName: string, levelName: LevelName, area: string, status: StatusGroup) {
      this.directionName = directionName;
      this.levelName = levelName;
      this._area = area;
      this._status = status;
    }
  
    showPerformance() {
      const sortedStudents = this._students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
      return sortedStudents;
    }
    
    get area(): string {
      return this._area;
    }

    get status(): StatusGroup {
      return this._status;
    }

    set status(value: StatusGroup) {
     this._status = value;
    }

    get students() {
      return this._students;
    }

    addStudent(student: Student): void {
      this._students.push(student);
    }

    removeStudent(student: Student): void {
      this._students = this._students.filter((_students) => _students !== student)
    }
  }
  
  class Student {
    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;
    private _grades: { [workName: string]: number } = {};
    private _visits: { [lesson: string]: boolean } = {};
  
    constructor(firstName: string, lastName: string, birthYear: number) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._birthYear = birthYear;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  
    set fullName(value: string) {
      [this._lastName, this._firstName] = value.split(' ');
    }
  
    get age(): number {
      return new Date().getFullYear() - this._birthYear;
    }

    set grade(grade: { workName: string; mark: number }) {
      this._grades[grade.workName] = grade.mark;
    }

    set visit(visit: {lesson: string; present: boolean}) {
      this._visits[visit.lesson] = visit.present;
    }
  
    getPerformanceRating(): number {
      const gradeValues = Object.values(this._grades);
  
      if (!gradeValues.length) return 0;
  
      const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
      const attendancePercentage: 
      number = (Object.values(this._visits).filter(present => present).length / Object.keys(this._visits).length) * 100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }
