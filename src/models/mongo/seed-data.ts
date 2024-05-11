export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  categories: {
    _model: "Category",
    category_1: {
      categoryName: "Anti Social Behavior",
    },
    category_2: {
      categoryName: "Domestic Crime",
    },
    category_3: {
      categoryName: "Hate Crime",
    },
    category_4: {
      categoryName: "Sexual Crime",
    },
    category_5: {
      categoryName: "Theft",
    },
    category_6: {
      categoryName: "Property Crime",
    },
    category_7: {
      categoryName: "Violent Event",
    },
  },
  reports: {
    _model: "Report",
    one: {
      reportName: "Scary Event",
      description: "Very Scary Event Occurred",
      reporter: "->users.bart",
      category: "->categories.category_5",
      lat: "52.161290",
      lng: "-7.51540",
    },
    two: {
      reportName: "Night Event",
      description: "Very Scary Night Event",
      reporter: "->users.homer",
      category: "->categories.category_1",
      lat: "52.161290",
      lng: "-7.51540",
    },
  },
};
