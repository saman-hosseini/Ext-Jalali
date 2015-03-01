Ext.apply(Ext.Date, {
    jalaliMonthNames: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند'
    ],
    jalaliDayNames: [
        'یک‌شنبه',
        'دوشنبه',
        'سه‌شنبه',
        'چهارشنبه',
        'پنج‌شنبه',
        'جمعه',
        'شنبه'
    ]
});

Ext.override(Ext.ux.JalaliDatePlugin.localization.DatePicker, {
    dayNames: Ext.Date.jalaliDayNames,
    monthNames: Ext.Date.jalaliMonthNames,
    longDayFormat: 'r e B',
    monthYearFormat: 'e B',
    format: 'B/Q/R',
    okText: 'ادامه',
    cancelText: 'بازگشت',
    todayTip: "{0} (Spacebar)",
    minText: "این تاریخ قبل از محدوده مجاز است",
    maxText: "این تاریخ پس از محدوده مجاز است",
    disabledDaysText: 'غیرفعال',
    disabledDatesText: 'غیرفعال',
    nextText: 'ماه بعد (Control + Right)',
    prevText: 'ماه قبل (Control+Left)',
    monthYearText: 'یک ماه را انتخاب کنید (Control+Up/Down برای انتقال در سال)',
    startDay: 6
});

Ext.override(Ext.ux.JalaliDatePlugin.localization.DateField, {
    dayNames: Ext.Date.jalaliDayNames,
    monthNames: Ext.Date.jalaliMonthNames,
    format: 'B/Q/R',
    altFormats: 'B/Q/R|B/q/r|b/q/r|b/Q/R|q/r|Q/R|Q/r|q/R|r|R',
    minText: 'باید تاریخ‌های پس از {0} را برگزینید',
    maxText: 'باید تاریخ‌های قبل از {0} را برگزینید',
    invalidText: '{0} تاریخ درستی نیست، باید در قالب «سال/ماه/روز» باشد',
    disabledDaysText: 'غیرفعال',
    disabledDatesText: 'غیرفعال',
    startDay: 6
});
