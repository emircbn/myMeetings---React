import moment from 'moment';

const formatTypes = {
  date: 'DD.MM.YYYY HH:mm:ss',
  tableday: 'D MMMM, HH:mm'
};

class DateUtil {
  static instance;

  constructor() {
    if (DateUtil.instance) {
      return DateUtil.instance;
    }

    this.moment = moment;
    DateUtil.instance = this;
  }

  format(date, formatType = 'date') {
    if (formatTypes[formatType]) {
      return this.moment(date).format(formatTypes[formatType]);
    }

    return this.moment(date);
  }
}

const dateUtilInstance = new DateUtil();

export default dateUtilInstance;
