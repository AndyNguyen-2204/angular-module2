export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
export const roles = ['user', 'admin'];

export const Sort = (array: any, criteria: string, order: string) => {
  // Tạo một bản sao của mảng array để tránh ảnh hưởng đến mảng gốc
  const sortedBooks = [...array];

  sortedBooks.sort((a, b) => {
    if (order === 'asc') {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    } else {
      if (a[criteria] > b[criteria]) return -1;
      if (a[criteria] < b[criteria]) return 1;
      return 0;
    }
  });

  return sortedBooks;
};
