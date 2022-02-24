//左下角的图标外链
import { connect } from "react-redux";
import { handleMessageBox, handleMessage } from "../../redux/actions/manager";
import UpdateInfo from "./component";
import { withNamespaces } from "react-i18next";
import { stateType } from "../../redux/store";

const mapStateToProps = (state: stateType) => {
  return {
    currentBook: state.book.currentBook,
  };
};
const actionCreator = { handleMessageBox, handleMessage };
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(UpdateInfo as any));
