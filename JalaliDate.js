(function () {
    'use strict';

    Ext.apply(Ext.Date, {
        isJalaliValid: function (y, m, d) {
            var g, j;
            if (y > 1500 || y < 1 || m > 12 || m < 1 || d > 31 || d < 1) {
                return false;
            }
            g = Ext.Date.JalaliConverter.jalaliToGregorian([y, m, d]);
            j = Ext.Date.JalaliConverter.gregorianToJalali(g);
            return j[0] === y && j[1] === m && j[2] === d;
        },
        correctJalaliDateOfMonth: function (year, month, date) {
            var d = Math.max(1, Math.min(31, date));
            if (month === 11 && d > 29) {
                if (Ext.Date.isJalaliLeapYear(year)) {
                    d = 30;
                } else {
                    d = 29;
                }
            } else if (month > 5 && d > 30) {
                d = 30;
            }
            return d;
        },
        createJalali: function (year, month, date) {
            var g = Ext.Date.JalaliConverter.jalaliToGregorian([year, month + 1, date]);
            return new Date(g[0], g[1] - 1, g[2], 12);
        },
        parseJalali: function (jalaliString, strict) {
            var g, d,
                split = jalaliString.split('/'),
                jy = parseInt(split[0], 10),
                jm = parseInt(split[1], 10),
                jd = parseInt(split[2], 10);
            if (isNaN(jy) || isNaN(jm) || isNaN(jd) || jy > 1500 || jy < 1300 || jm > 12 || jm < 1 || jd > 31 || jd < 1) {
                return null;
            }
            g = Ext.Date.JalaliConverter.jalaliToGregorian([jy, jm, jd]);
            d = new Date(g[0], g[1] - 1, g[2], 12);
            if (strict &&
                    (!d || Ext.Date.getJalaliFullYear(d) !== jy || Ext.Date.getJalaliMonth(d) + 1 !== jm || Ext.Date.getJalaliDate(d) !== jd)) {
                return null;
            }
            return d;
        },
        renderToGregorian: function (jalaliString) {
            var split = jalaliString.split('/'),
                jy = parseInt(split[0], 10),
                jm = parseInt(split[1], 10),
                jd = parseInt(split[2], 10);
            var g = Ext.Date.JalaliConverter.jalaliToGregorian([jy, jm, jd]);
            var month = g[1]< 10 ? "0" + g[1] : g[1];
            var day = g[2] < 10 ? "0" + g[2] : g[2];
            return g[0] + "/" + month + "/" + day;
        },
        convertToJalali: function (date) {
            var j = Ext.Date.JalaliConverter.gregorianToJalali([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            return {
                jalaliYear: j[0],
                jalaliMonth: j[1] - 1,
                jalaliDate: j[2]
            };
        },
        renderToJalali: function (date) {
            if (date == null || date.length == 1) return null;
            var j = Ext.Date.JalaliConverter.gregorianToJalali([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            return j[0] + "/" + (j[1] < 10 ? "0" + j[1] : j[1]) + "/" + (j[2] < 10 ? "0" + j[2] : j[2]);
        },
        renderToJalaliDateTime: function (date) {
            if (date == null || date.length == 1) return null;
            var h = date.getHours();
            var m = date.getMinutes();            
            var s = date.getSeconds();
            var j = Ext.Date.JalaliConverter.gregorianToJalali([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            return j[0] + "/" + (j[1] < 10 ? "0" + j[1] : j[1]) + "/" + (j[2] < 10 ? "0" + j[2] : j[2]) +
                " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        },
        getJalaliFullYear: function (date) {
            return Ext.Date.convertToJalali(date).jalaliYear;
        },
        getJalaliMonth: function (date) {
            return Ext.Date.convertToJalali(date).jalaliMonth;
        },
        getJalaliDate: function (date) {
            return Ext.Date.convertToJalali(date).jalaliDate;
        },
        isJalaliLeapYear: function (date) {
            var year = date;
            if (Object.prototype.toString.call(date) === '[object Date]') {
                year = Ext.Date.convertToJalali(date).jalaliYear;
            }
            return Ext.Date.isJalaliValid(year, 12, 30);
        },
        addJalali: function (date, interval, value) {
            var jd, gd,
                d = new Date(date.getTime());
            if (!interval || value === 0) {
                return d;
            }

            jd = Ext.Date.convertToJalali(d);

            switch (interval.toLowerCase()) {
                case Ext.Date.DAY:
                    jd.jalaliDate += value;
                    break;
                case Ext.Date.MONTH:
                    jd.jalaliMonth += value;
                    jd.jalaliYear += Math.floor(jd.jalaliMonth / 12);
                    jd.jalaliMonth %= 12;
                    if (jd.jalaliMonth < 0) {
                        jd.jalaliMonth += 12;
                    }
                    jd.jalaliDate = Ext.Date.correctJalaliDateOfMonth(jd.jalaliYear, jd.jalaliMonth, jd.jalaliDate);
                    break;
                case Ext.Date.YEAR:
                    jd.jalaliYear += value;
                    jd.jalaliDate = Ext.Date.correctJalaliDateOfMonth(jd.jalaliYear, jd.jalaliMonth, jd.jalaliDate);
                    break;
            }
            gd = Ext.Date.JalaliConverter.jalaliToGregorian([jd.jalaliYear, jd.jalaliMonth + 1, jd.jalaliDate]);
            d.setFullYear(gd[0]);
            d.setMonth(gd[1] - 1);
            d.setDate(gd[2]);
            return d;
        },
        getJalaliDaysInMonth: function (date) {
            var days, jd = Ext.Date.convertToJalali(date);
            if (jd.jalaliMonth < 6) {
                days = 31;
            } else if (jd.jalaliMonth < 11) {
                days = 30;
            } else if (Ext.Date.isJalaliLeapYear(jd.jalaliYear)) {
                days = 30;
            } else {
                days = 29;
            }
            return days;
        },
        getJalaliFirstDateOfMonth: function (date) {
            var jd = Ext.Date.convertToJalali(date);
            return Ext.Date.createJalali(jd.jalaliYear, jd.jalaliMonth, 1);
        },

        /**
         * Month names of Jalali calendar. Override this for localization.
         */
        jalaliMonthNames: [
            'Farvardin',
            'Ordibehesht',
            'Khordad',
            'Tir',
            'Amordad',
            'Shahrivar',
            'Mehr',
            'Aban',
            'Azar',
            'Dey',
            'Bahman',
            'Esfand'
        ]
    });
   
    Ext.apply(Ext.Date.formatCodes, {
        r: "Ext.Date.getJalaliDate(this)",
        R: "Ext.String.leftPad(Ext.Date.getJalaliDate(this), 2, '0')",
        q: "(Ext.Date.getJalaliMonth(this) + 1)",
        Q: "Ext.String.leftPad(Ext.Date.getJalaliMonth(this) + 1, 2, '0')",
        e: "Ext.Date.jalaliMonthNames[Ext.Date.getJalaliMonth(this)]",
        b: "('' + Ext.Date.getJalaliFullYear(this)).substring(2, 4)",
        B: "Ext.Date.getJalaliFullYear(this)"
    });

    Ext.apply(Ext.Date.formatFunctions, {
        /**
         * Formats date instances using Jalali format (like: "1389/06/14").
         * @return {String} Textual representation of Jalali date.
         */
        'Jalali': function () {
            var jd = Ext.Date.convertToJalali(this);
            return jd.jalaliYear + '/' +
                    Ext.String.leftPad(jd.jalaliMonth + 1, 2, '0') + '/' +
                    Ext.String.leftPad(jd.jalaliDate, 2, '0');
        }
    });

    Ext.apply(Ext.Date.parseFunctions, {
        /**
         * Parses a Jalali formatted date string (like "1389/06/09") and returns a Date object.
         * @param {String} jalaliString Formatted string to parse.
         * @param {Boolean} strict True to validate date strings after parsing which will return null when invalid
         * (default is false).
         * @return {Date} A Date object which is set to the Gregorian conversion of input.
         */
        'Jalali': Ext.Date.parseJalali,
        'B/Q/R': Ext.Date.parseJalali,
        'B/q/r': Ext.Date.parseJalali,
        'b/q/r': function (value, strict) {
            return Ext.Date.parseJalali('13' + value, strict);
        },
        'b/Q/R': function (value, strict) {
            return Ext.Date.parseJalali('13' + value, strict);
        },
        'B': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(value + '/' + (Ext.Date.getJalaliMonth(now) + 1) + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'b': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali('13' + value + '/' + (Ext.Date.getJalaliMonth(now) + 1) + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'Q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'r': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + (Ext.Date.getJalaliMonth(now) + 1) + '/' + value, strict);
        },
        'R': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + (Ext.Date.getJalaliMonth(now) + 1) + '/' + value, strict);
        },
        'b/q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali('13' + value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'B/q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'B/Q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'b/Q': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali('13' + value + '/' + Ext.Date.getJalaliDate(now), strict);
        },
        'q/r': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value, strict);
        },
        'Q/r': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value, strict);
        },
        'Q/R': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value, strict);
        },
        'q/R': function (value, strict) {
            var now = new Date();
            return Ext.Date.parseJalali(Ext.Date.getJalaliFullYear(now) + '/' + value, strict);
        }
    });
}());
