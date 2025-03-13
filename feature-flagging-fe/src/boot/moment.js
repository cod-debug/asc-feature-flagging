import moment from "moment";

export default ({app}) => {
    app.config.globalProperties.$moment = moment;
}