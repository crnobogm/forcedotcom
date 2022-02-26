//控制列表模式下的图书显示
import React from "react";
import RecentBooks from "../../utils/recordRecent";
import "./bookItem.css";
import RecordLocation from "../../utils/recordLocation";
import { BookItemProps, BookItemState } from "./interface";
import { Trans } from "react-i18next";
import localforage from "localforage";

declare var window: any;

class Book extends React.Component<BookItemProps, BookItemState> {
  epub: any;
  constructor(props: BookItemProps) {
    super(props);
    this.state = { isDeleteDialog: false };
    this.handleOpenBook = this.handleOpenBook.bind(this);
  }
  handleOpenBook() {
    localforage.getItem(this.props.book.key).then((result) => {
      this.props.handleReadingEpub(window.ePub(result, {}));
      this.props.handleReadingState(true);
      this.props.handleReadingBook(this.props.book);
      RecentBooks.setRecent(this.props.book.key);
    });
  }
  handleDeleteBook = () => {
    this.props.handleDeleteDialog(true);
    this.props.handleReadingBook(this.props.book);
  };
  handleEditBook = () => {
    this.props.handleEditDialog(true);
    this.props.handleReadingBook(this.props.book);
  };
  handleAddShelf = () => {
    this.props.handleAddDialog(true);
    this.props.handleReadingBook(this.props.book);
  };
  render() {
    let percentage = RecordLocation.getCfi(this.props.book.key)
      ? RecordLocation.getCfi(this.props.book.key).percentage
      : 0;
    return (
      <div className="book-list-item-container">
        {this.props.book.cover ? (
          <img
            className="book-item-list-cover"
            src={this.props.book.cover}
            alt=""
            onClick={() => {
              this.handleOpenBook();
            }}
          />
        ) : (
          <div className="book-item-list-cover book-item-list-cover-img">
            <img src="assets/cover.svg" alt="" style={{ width: "80%" }} />
          </div>
        )}

        <p
          className="book-item-list-title"
          onClick={() => {
            this.handleOpenBook();
          }}
        >
          {this.props.book.name}
        </p>
        <p className="book-item-list-author">
          {this.props.book.author ? (
            this.props.book.author
          ) : (
            <Trans>Unknown Authur</Trans>
          )}
        </p>
        <p className="book-item-list-percentage">
          {percentage ? Math.round(percentage * 100) : 0}%
        </p>
        <div className="book-item-list-config">
          <span
            className="icon-shelf list-icon"
            onClick={() => {
              this.handleAddShelf();
            }}
            color="rgba(75,75,75,1)"
          ></span>
          <span
            className="icon-trash list-icon"
            onClick={() => {
              this.handleDeleteBook();
            }}
          ></span>
          <span
            className="icon-edit list-icon"
            onClick={() => {
              this.handleEditBook();
            }}
          ></span>
        </div>
      </div>
    );
  }
}

export default Book;
