import style from "./preloader.module.scss";

function Preloader() {
  return (
      <div className={style.preloader}>
            <div className={style.bookshelf_wrapper}>
                <ul className={style.books_list}>
                    <li className={`${style.book_item} ${style.first}`}></li>
                    <li className={`${style.book_item} ${style.second}`}></li>
                    <li className={`${style.book_item} ${style.third}`}></li>
                    <li className={`${style.book_item} ${style.fourth}`}></li>
                    <li className={`${style.book_item} ${style.fifth}`}></li>
                    <li className={`${style.book_item} ${style.sixth}`}></li>
                </ul>
                <div className={style.shelf}></div>
            </div>
      </div>
  );
}

export default Preloader;