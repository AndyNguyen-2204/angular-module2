import { Observable, of } from 'rxjs';
import { BookType } from './type/book';
const fakeData = [
  {
    id: '61ff7f3f1b28e20dbf7435a1',
    cover_image:
      'https://cungdocsach.vn/wp-content/uploads/2020/10/%C4%90%E1%BA%AFc-nh%C3%A2n-t%C3%A2m-3.jpg',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 20000,
    quantity_available: 100,
    description:
      'Đắc Nhân Tâm (How to Win Friends and Influence People) được mệnh danh là quyển sách hay nhất, nổi tiếng nhất, bán chạy nhất và nó có tầm ảnh hưởng đi xa nhất mọi thời đại, Đắc Nhân Tâm của soạn giả Dale Carnegie là 1 quyển sách hay nên đọc để bạn biết về nghệ thuật thu phục lòng người và làm tất cả mọi người phải yêu mến mình.Quyển sách này cũng nêu bật lên các nguyên tắc trong việc đối nhân xử thế rất khôn ngoan bắt đầu từ việc thấu hiểu, thành thật với chính bản thân mình cũng như gợi ý cho người đọc cách biết quan tâm đến những người kế bên để cùng hòa nhập, cùng nhau phát triển khả năng của chính mình và mọi người lên 1 tầm cao mới. Những người đã đọc sách Đắc Nhân Tâm có thể cũng cảm nhận được một tinh thần xuyên suốt mà tác giả muốn thể hiện trong quyển sách hay này. Đấy chính là chữ “nhẫn”. Nếu bạn có chữ “nhẫn” thì tất cả mọi việc sẽ được thay đổi nhìn nhận theo 1 hướng khác mà nơi đó sẽ khiến cho cuộc sống trở nên là một màu xanh hy vọng mãi mãi.',
    genre: {
      title: 'Nghệ Thuật',
      type: 'NT',
    },
    publication_year: 2021,
    rating: 5,
    quantity: 0,
  },
  {
    id: '62ff7f3f1b28bcddbf7429ec',
    cover_image:
      'https://prices.vn/photos/8/product/sach-moi-lan-vap-nga-la-mot-lan-truong-thanh1.png',
    title: 'Mỗi Lần Vấp Ngã Là Một Lần Trưởng Thành',
    author: 'Liêu Trí Phong',
    price: 35000,
    quantity_available: 50,
    description:
      'Đây là cuốn sách hay về cuộc sống với nội dung theo kiểu kể chuyện và phân tích. Đây là cuốn sách giúp bạn trưởng thành hơn mà một lần vô tình ghé nhà sách, tôi bắt gặp tựa đề quá hay. Những câu chuyện trong đây như một dẫn chứng cụ thể và sống động trong cuộc sống thường ngày của mỗi chúng ta, trong đó có tôi và bạn đấy. Tác giả Liêu Trí Phong dẫn dụ những câu nói, những câu chuyện thực về đối nhân xử thế, về đạo đức, về kinh doanh…v.v để rồi phân tích rõ nét để chúng ta hiểu sâu sắc hơn về cuộc sống của mỗi người đang sống hoặc trong tương lại sẽ cần đến. Người ta vẫn thường hay nói mỗi lần vấp ngã là một lần đau và sau mỗi cú ngã ấy, chúng ta sẽ trở nên mạnh mẽ và trưởng thành hơn bao giờ hết. Cuộc sống đôi khi cũng có những ngày như thế đó. Thế nhưng, khi sự vấp ngã đã trở thành thói quen với một thân mình chằng chịt vết trầy xước, đó chính là khi tâm hồn dần dần hình thành sự vô cảm và chai sạm trước những nỗi đau.',
    genre: {
      title: 'Đạo Đức',
      type: 'DD',
    },
    publication_year: 2019,
    rating: 4.0,
    quantity: 0,
  },
  {
    id: '65vvdf3f1b569gcdbf647dd',
    cover_image:
      'https://hiu.vn/wp-content/uploads/2021/05/review-tuoi-tre-dang-gia-bao-nhieu-1.jpg',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 40000,
    quantity_available: 75,
    description:
      'Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ. Bạn từng trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng? Bạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ. Suy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn. Nên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống. Vì sau tất cả, chẳng ai quan tâm. Tôi đã đọc quyển sách này một cách thích thú. Có nhiều kiến thức và kinh nghiệm hữu ích, những điều mới mẻ ngay cả với người gần trung niên như tôi.',
    genre: {
      title: 'Cuộc Sống',
      type: 'CS',
    },
    publication_year: 2021,
    rating: 4.2,
    quantity: 0,
  },
  {
    id: '61ff7f3f1b28e20dbf7435a5',
    cover_image:
      'https://tieudao.info/wp-content/uploads/2021/02/33443699240_de9d18b9c1_c.jpg',
    title: 'Đời thay đổi khi chúng ta thay đổi',
    author: 'Andrew Matthews',
    price: 43000,
    quantity_available: 20,
    description:
      '“Đời thay đổi khi chúng ta thay đổi” (Being A Happy Teenager) đem lại cho độc giả những tình huống vô cùng thực tế, thậm chí là các câu chuyện vừa “nhỏ nhặt” lại vừa “quan trọng” với cách ứng xử khôn ngoan, thú vị và hài hước… Đồng thời, độc giả như bắt gặp chính mình trong đó, có những cạnh tranh, thất bại, và có những tình huống giao tiếp vừa chân thật lại vừa bổ ích. Thưởng thức bộ sách này của soạn giả Andrew Matthews để học hỏi, giải trí và chắc chắn bạn sẽ lĩnh hội được rất nhiều các bài học rất hấp dẫn và bổ ích.',
    genre: {
      title: 'Truyện Tranh',
      type: 'TT',
    },
    publication_year: 2023,
    rating: 3.9,
    quantity: 0,
  },
  {
    id: '6cc7f4g155hcl0dbf7435a4',
    cover_image:
      'https://www.reader.com.vn/uploads/images/nha-lanh-dao-khong-chuc-danh.jpeg',
    title: 'Nhà Lãnh Đạo không Chức Danh',
    author: 'Robin Sharma',
    price: 28000,
    quantity_available: 2,
    description:
      'Cho dù bạn làm gì trong tổ chức và cuộc sống hiện nay của bạn như thế nào, một thực tế quan trọng duy nhất là bạn hoàn toàn có khả năng thể hiện năng lực để làm lãnh đạo. Cho dù sự nghiệp hiện nay của bạn đang ở đâu, bạn vẫn luôn cần thể hiện các khả năng tột đỉnh của mình. Cuốn sách này sẽ hướng dẫn bạn làm thế nào để khai thác tối đa khả năng trong chính bạn, cũng như thay đổi cuộc sống và thế giới ở quanh bạn.',
    genre: {
      title: 'Nghệ Thuật',
      type: 'NT',
    },
    publication_year: 2016,
    rating: 4.2,
    quantity: 0,
  },
];

export class BookService {
  private demoBooks: BookType[] = [];
  bookDetail: BookType = {
    id: '',
    title: '',
    author: '',
    price: 0,
    quantity_available: 0,
    cover_image: '',
    genre: {
      title: '',
      type: '',
    },
    description: '',
    publication_year: 0,
    rating: 0,
    quantity: 0,
    // Các thuộc tính khác của đối tượng BookType
  };
  constructor() {
    this.demoBooks = fakeData;
  }
  getBooks() {
    return this.demoBooks;
  }
  getBookDetail(
    id: string
  ): Observable<{ status: boolean; text: string; data?: BookType }> {
    const book = this.demoBooks.find((book: BookType) => book.id === id);
    if (!book || !id) {
      return of({ status: false, text: 'Id book không tồn tại!' });
    }
    this.bookDetail = book;
    return of({
      status: true,
      text: 'Get book detail thành công!',
      data: book,
    });
  }
  searchBook(keyword: string, valueFilter: string) {
    if (!keyword.trim()) {
      return this.demoBooks;
    }
    const keywordWithoutDiacritics = this.removeDiacritics(
      keyword.toLowerCase()
    );
    if (valueFilter === '' || valueFilter === 'ALL') {
      return this.demoBooks.filter((book: BookType) =>
        this.removeDiacritics(book.title.toLowerCase()).includes(
          keywordWithoutDiacritics
        )
      );
    } else {
      return this.demoBooks.filter(
        (book: BookType) =>
          this.removeDiacritics(book.title.toLowerCase()).includes(
            keywordWithoutDiacritics
          ) && book.genre.type === valueFilter
      );
    }
  }
  filterBook(keyword: string, valueFilter: string) {
    const keywordWithoutDiacritics = this.removeDiacritics(
      keyword.toLowerCase()
    );
    if (valueFilter === 'ALL' && keyword.trim() === '') {
      return this.demoBooks;
    } else if (valueFilter !== 'ALL' && keyword.trim() === '') {
      return this.demoBooks.filter(
        (book: BookType) => book.genre.type === valueFilter
      );
    } else if (valueFilter === 'ALL' && keyword.trim() !== '') {
      return this.demoBooks.filter((book: BookType) =>
        this.removeDiacritics(book.title.toLowerCase()).includes(
          keywordWithoutDiacritics
        )
      );
    } else {
      return this.demoBooks.filter(
        (book: BookType) =>
          this.removeDiacritics(book.title.toLowerCase()).includes(
            keywordWithoutDiacritics
          ) && book.genre.type === valueFilter
      );
    }
  }
  //removeDiacritics
  removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
