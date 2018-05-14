Ext.define('Ux.date.MonthYearFloater', {
  extend: 'Ext.Panel',
  xtype: 'ux-date-monthyearfloater',

  requires: [
    'Ext.dataview.List',
    'Ext.layout.HBox',
    'Ext.Toolbar',

    'Ux.date.MonthYearFloaterController'
  ],

  config: {
    /**
     * @cfg {Date} value
     * The date currently selected.
     */
    value: null,

    maxHeight: 400,
    minWidth: 200,

    /**
     * @cfg {Ext.dataview.List} list
     * The config for the month list.
     */
    monthList: {
      xclass: 'Ext.dataview.List',
      flex: 1,
      weight: -50,
      store: {}
    },

    /**
     * @cfg {Ext.dataview.List} list
     * The config for the year list.
     */
    yearList: {
      xclass: 'Ext.dataview.List',
      flex: 1,
      weight: 50,
      store: {}
    },

    /**
     * @cfg {Number} yearFrom
     * The year number to show years from.
     */
    yearFrom: 1980,

    /**
     * @cfg {Number} yearTo
     * The year number to show years to. Defaults
     * to the current year.
     */
    yearTo: new Date().getFullYear(),

    buttons: {
      cancel: {
        handler: 'onCancel'
      },
      ok: {
        handler: 'onOk'
      }
    }
  },

  floated: true,

  controller: {
    xclass: 'Ux.date.MonthYearFloaterController'
  },

  layout: {
    type: 'hbox'
  },

  applyMonthList (list, oldList) {
    return Ext.factory(list, Ext.Component, oldList)
  },

  applyYearList (list, oldList) {
    return Ext.factory(list, Ext.Component, oldList)
  },

  updateMonthList (list) {

    if (list) {
      const store = list.getStore()

      if (!store.getCount()) {
        const date = new Date()
        const months = []

        while (months.length < 12) {
          date.setMonth(months.length)

          months.push({
            value: months.length,
            text: Ext.Date.format(date, 'F')
          })
        }

        store.setData(months)
      }

      this.add(list)
    }
  },

  applyValue (value) {
    if (Ext.isString(value)) {
      value = Ext.Date.parse(value, Ext.Date.defaultFormat)
    }

    return value
  },

  updateValue (value) {
    const monthList = this.getMonthList()
    const yearList = this.getYearList()

    if (value) {
      let store = monthList.getStore()
      let record = store.getAt(value.getMonth())

      monthList.select(record, false, true)

      monthList.ensureVisible({
        animation: false,
        focus: true,
        record: record
      })

      store = yearList.getStore()
      record = store.findRecord('value', value.getFullYear())

      yearList.select(record, false, true)

      yearList.ensureVisible({
        animation: false,
        focus: true,
        record: record
      })
    } else {
      monthList.setSelection()
      yearList.setSelection()
    }
  },

  updateYearList (list) {
    if (list) {
      const store = list.getStore()

      if (!store.getCount()) {
        let from = this.getYearFrom()
        const to = this.getYearTo()
        const years = []

        for (; from <= to; from++) {
          years.push({
            value: from,
            text: from
          })
        }

        store.setData(years)
      }

      this.add(list)
    }
  }
})
