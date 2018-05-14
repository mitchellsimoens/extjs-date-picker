Ext.define('Ux.date.MonthYearFloaterController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ux-date-monthyearfloater',

  onCancel: function () {
    var view = this.getView()

    view.hide()
  },

  onOk: function () {
    var view = this.getView(),
      value = view.getValue() || new Date(),
      monthList = view.getMonthList(),
      yearList = view.getYearList(),
      selected = monthList.getSelections()[0]

    value.setMonth(selected.get('value'))

    selected = yearList.getSelections()[0]

    value.setYear(selected.get('value'))

    this.fireViewEvent('valuechange', view, value)

    view.hide()
  }
})
