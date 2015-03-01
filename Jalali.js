(function () {
    'use strict';
    Ext.Date.JalaliConverter = {};
    Ext.Date.JalaliConverter.gregorianDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    Ext.Date.JalaliConverter.jalaliDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    Ext.Date.JalaliConverter.div = function (a, b) {
        return Math.floor(a / b);
    };
    Ext.Date.JalaliConverter.remainder = function (a, b) {
        return a - Math.floor(a / b) * b;
    };
    Ext.Date.JalaliConverter.gregorianToJalali = function (g) {
        var gy, gm, gd,
            jy, jm, jd,
            g_day_no, j_day_no,
            j_np, i, div, remainder,
            g_days_in_month, j_days_in_month;
        gy = g[0] - 1600;
        gm = g[1] - 1;
        gd = g[2] - 1;
        div = Ext.Date.JalaliConverter.div;
        remainder = Ext.Date.JalaliConverter.remainder;
        g_days_in_month = Ext.Date.JalaliConverter.gregorianDaysInMonth;
        j_days_in_month = Ext.Date.JalaliConverter.jalaliDaysInMonth;

        g_day_no = 365 * gy + div((gy + 3), 4) - div((gy + 99), 100) + div((gy + 399), 400);
        for (i = 0; i < gm; i += 1) {
            g_day_no += g_days_in_month[i];
        }
        if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
            /* leap and after Feb */
            g_day_no += 1;
        }
        g_day_no += gd;
        j_day_no = g_day_no - 79;
        j_np = div(j_day_no, 12053);
        j_day_no = remainder(j_day_no, 12053);
        jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);
        j_day_no = remainder(j_day_no, 1461);
        if (j_day_no >= 366) {
            jy += div((j_day_no - 1), 365);
            j_day_no = remainder((j_day_no - 1), 365);
        }
        for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; i += 1) {
            j_day_no -= j_days_in_month[i];
        }
        jm = i + 1;
        jd = j_day_no + 1;
        return [jy, jm, jd];
    };
    Ext.Date.JalaliConverter.jalaliToGregorian = function (j) {
        var gy, gm, gd,
            jy, jm, jd,
            g_day_no, j_day_no,
            leap, i, div, remainder,
            g_days_in_month, j_days_in_month;
        jy = j[0] - 979;
        jm = j[1] - 1;
        jd = j[2] - 1;
        div = Ext.Date.JalaliConverter.div;
        remainder = Ext.Date.JalaliConverter.remainder;
        g_days_in_month = Ext.Date.JalaliConverter.gregorianDaysInMonth;
        j_days_in_month = Ext.Date.JalaliConverter.jalaliDaysInMonth;
        j_day_no = 365 * jy + div(jy, 33) * 8 + div((remainder(jy, 33) + 3), 4);
        for (i = 0; i < jm; i += 1) {
            j_day_no += j_days_in_month[i];
        }
        j_day_no += jd;
        g_day_no = j_day_no + 79;
        gy = 1600 + 400 * div(g_day_no, 146097);
        g_day_no = remainder(g_day_no, 146097);
        leap = 1;
        if (g_day_no >= 36525) {
            g_day_no -= 1;
            gy += 100 * div(g_day_no, 36524);
            g_day_no = remainder(g_day_no, 36524);
            if (g_day_no >= 365) {
                g_day_no += 1;
            } else {
                leap = 0;
            }
        }
        gy += 4 * div(g_day_no, 1461);
        g_day_no = remainder(g_day_no, 1461);
        if (g_day_no >= 366) {
            leap = 0;
            g_day_no -= 1;
            gy += div(g_day_no, 365);
            g_day_no = remainder(g_day_no, 365);
        }

        for (i = 0; g_day_no >= g_days_in_month[i] + (i === 1 && leap); i += 1) {
            g_day_no -= g_days_in_month[i] + (i === 1 && leap);
        }
        gm = i + 1;
        gd = g_day_no + 1;
        return [gy, gm, gd];
    };
}());

