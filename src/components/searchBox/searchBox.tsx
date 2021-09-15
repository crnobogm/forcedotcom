import React from "react";
import "./searchBox.css";
import { connect } from "react-redux";
import { handleSearchBooks, handleSearch } from "../../redux/actions/manager";
import OtherUtil from "../../utils/otherUtil";
import BookModel from "../../model/Book";
import { stateType } from "../../redux/store";
import { Trans, withNamespaces } from "react-i18next";

export interface SearchBoxProps {
  books: BookModel[];
  isSearch: boolean;
  handleSearchBooks: (results: number[]) => void;
  handleSearch: (isSearch: boolean) => void;
}

class SearchBox extends React.Component<SearchBoxProps> {
  handleMouse = () => {
    let results = OtherUtil.MouseSearch(this.props.books);
    this.props.handleSearchBooks(results);
    this.props.handleSearch(true);
  };
  handleKey = (event: any) => {
    let results = OtherUtil.KeySearch(event, this.props.books);
    if (results !== undefined) {
      this.props.handleSearchBooks(results);
      this.props.handleSearch(true);
    }
  };

  handleCancel = () => {
    this.props.handleSearch(false);
    (document.querySelector(".header-search-box") as HTMLInputElement).value =
      "";
  };

  render() {
    return (
      <div className="header-search-container">
        <input
          type="text"
          placeholder="搜索我的书库"
          className="header-search-box"
          onKeyDown={(event) => {
            this.handleKey(event);
          }}
        />
        {this.props.isSearch ? (
          <span
            className="header-search-text"
            onClick={() => {
              this.handleCancel();
            }}
          >
            <Trans>Cancel</Trans>
          </span>
        ) : (
          <span
            className="icon-search header-search-icon"
            onClick={() => {
              this.handleMouse();
            }}
          ></span>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: stateType) => {
  return {
    books: state.manager.books,
    isSearch: state.manager.isSearch,
  };
};
const actionCreator = {
  handleSearchBooks,
  handleSearch,
};
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(SearchBox as any));
