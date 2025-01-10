export interface Student {
  courseId: string;
  profile: {
    id: string;
    name: {
      familyName: string;
      fullName: string;
      givenName: string;
    };
  };
  userId: string;
}
