import React from "react";
import RecordLocation from "../../utils/recordLocation";
import { MouseEvent } from "../../utils/mouseEvent";
import { ViewPageProps, ViewPageState } from "./interface";
import OtherUtil from "../../utils/otherUtil";
import BookmarkModel from "../../model/Bookmark";

class ViewPage extends React.Component<ViewPageProps, ViewPageState> {
  constructor(props: ViewPageProps) {
    super(props);
    this.state = {
      isSingle: OtherUtil.getReaderConfig("isSingle") === "single",
    };
  }
  componentDidMount() {
    let page = document.querySelector("#page-area");
    let epub = this.props.currentEpub;
    (window as any).rangy.init(); // 初始化
    epub.renderTo(page);
    MouseEvent(epub); // 绑定事件

    epub.on("renderer:locationChanged", () => {
      this.props.handleOpenMenu(false);
      let cfi = epub.getCurrentLocationCfi();
      this.props.handleShowBookmark(
        this.props.bookmarks &&
          this.props.bookmarks.filter(
            (item: BookmarkModel) => item.cfi === cfi
          )[0]
          ? true
          : false
      );

      if (this.props.locations) {
        let percentage = this.props.locations.percentageFromCfi(cfi);
        RecordLocation.recordCfi(this.props.currentBook.key, cfi, percentage);
        this.props.handlePercentage(percentage);
      }
    });
    epub.gotoCfi(
      RecordLocation.getCfi(this.props.currentBook.key) === null
        ? null
        : RecordLocation.getCfi(this.props.currentBook.key).cfi
    );
    document.addEventListener("copy", this.copyTextHack);
  }
  copyTextHack = (event: any) => {
    if (
      !document ||
      !document.getElementsByTagName("iframe")[0].contentDocument
    ) {
      return;
    }
    let iDoc = document.getElementsByTagName("iframe")[0].contentDocument;
    let copyText =
      iDoc!.getSelection()!.toString() || document!.getSelection()!.toString();
    event.clipboardData.setData("text/plain", copyText);
    event.preventDefault();
  };
  render() {
    this.props.currentEpub.renderer.forceSingle(this.state.isSingle);
    return (
      <>
        <div className="view-area-page" id="page-area"></div>
        {this.props.isShowBookmark ? <div className="bookmark"></div> : null}
      </>
    );
  }
}

export default ViewPage;
