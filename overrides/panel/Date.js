Ext.define(null, {
  override: 'Ext.panel.Date',

  requires: [
    'Ux.date.MonthYearFloater'
  ],

  config: {
    tools: {
      previousYear: {
        reference: 'navigatePrevYear',
        iconCls: 'x-fa fa-angle-double-left',
        cls: Ext.baseCSSPrefix + 'left-month-tool',
        weight: -90,
        increment: -12,
        focusable: false,
        tabIndex: null,
        forceTabIndex: true,
        listeners: {
          click: 'onMonthToolClick'
        }
      },
      nextYear: {
        reference: 'navigateNextYear',
        iconCls: 'x-fa fa-angle-double-right',
        cls: Ext.baseCSSPrefix + 'right-month-tool',
        weight: 90,
        increment: 12,
        focusable: false,
        tabIndex: null,
        forceTabIndex: true,
        listeners: {
          click: 'onMonthToolClick'
        }
      }
    },

    /**
     * @cfg {Ux.date.MonthYearFloater} monthYearFloater
     * The configuration object to create the floater that will
     * allow month and year to be selected.
     */
    monthYearFloater: {
      lazy: true,
      $value: {
        xclass: 'Ux.date.MonthYearFloater',
        listeners: {
          valuechange: 'onValueChange'
        }
      }
    }
  },

  destroy: function () {
    Ext.destroyMembers(this)

    this.superclass.destroy.call(this)
  },

  updateHidden: function (hidden, oldHidden) {
    if (hidden && oldHidden === false) {
      const floater = this._monthYearFloater

      if (floater) {
        floater.hide()
      }
    }

    this.superclass.updateHidden.call(this, hidden, oldHidden)
  },

  applyMonthYearFloater: function (floater, oldFloater) {
    if (floater) {
      floater.$initParent = this
    }

    return Ext.factory(floater, Ext.Container, oldFloater)
  },

  updateNavigationPosition: function (pos) {
    this.callParent([ pos ])

    const toolCt = this.toolCt
    const cmp = toolCt.getAt(
      Math.floor(toolCt.innerItems.length / 2)
    )

    cmp.addCls('date-panel-caption')

    this.mon(cmp, {
      scope: this,
      stopEvent: true,
      element: 'element',
      tap: 'onDateCaptionTap'
    })
  },

  onDateCaptionTap: function (e) {
    const floater = this.getMonthYearFloater()

    if (floater) {
      const target = e.getTarget('.x-component', null, true)
      const value = this.getValue()

      floater.showBy(target)

      floater.setValue(value)
    }
  },

  onValueChange: function (view, value) {
    this.setValue(value)
  }
})
