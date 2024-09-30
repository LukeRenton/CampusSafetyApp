/**
 * File: DateTimeService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service hosting important functions for date/time objects.
 */

export function convert_date_string_to_sql_valid(string) {
    const parts = string.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parseInt(parts[2]) + 1;

    const date = year+"-"+month+"-"+day;

    return date;
}

export function string_to_date(string) {
    const parts = string.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const date = new Date(year, month, day);
    return date;
}

/*
    Function: compare_dates

    Description:
        Comparison function important for sorting algorithms
    
    Parameters:
        date1: First date object to be compared
        date2: Second date object to be compared

    Returns:
        -1 if date1>date2 
        1 if date2>date1
*/
export function compare_dates(date1, date2) {
    if (date1 > date2) {
        return -1;
    }
    return 1;
}

/*
    Function: get_year_month_day

    Description:
        Converts a Date object into integer components of year, month, day
    
    Parameters:
        date: the Date object to be converted

    Returns:
        Object with "year", "month" and "day" keys and relevant values
*/
function get_year_month_day(date) { 
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
        year: year,
        month: month,
        day: day
    }
}

/*
    Function: get_date_string

    Description:
        Converts a date object into a string in the form "dd mmmm yyyy"
    
    Parameters:
        date_object: An object of {year: _, month: _, day: _} with relevant values

    Returns:
        String of the date in the form "dd mmmm yyyy"
*/
export function get_date_string(date_object) {
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const year = String(date_object.year);
    const month = month_names[date_object.month - 1];
    const day = String(date_object.day).padStart(2, '0');

    return day + ' ' + month + ' ' + year
}

/*
    Function: is_today

    Description:
        Checks whether a given date object is today
    
    Parameters:
        date_object: An object of {year: _, month: _, day: _} with relevant values

    Returns:
        True if date is today
        False otherwise
*/
function is_today(date_object) {
    const date_string = get_date_string(date_object);
    const today = get_date_string(get_year_month_day(new Date()));
    
    return (date_string === today);
}

/*
    Function: is_yesterday

    Description:
        Checks whether a given date object is yesterday
    
    Parameters:
        date_object: An object of {year: _, month: _, day: _} with relevant values

    Returns:
        True if date is yesterday
        False otherwise
*/
function is_yesterday(date_object) {
    const today = get_year_month_day(new Date());

    return ((date_object.year === today.year) && (date_object.month === today.month) && (date_object.day === (today.day - 1)));
}

/*
    Function: get_date_header

    Description:
        Converts a date object into either "Today", "Yesterday" or its actual string date formate
    
    Parameters:
        date: the Date object to convert

    Returns:
        "Today" if the date is today
        "Yesterday" if the date is yesterday
        "dd mmmm yyyy" if the date is neither today nor yesterday
*/
export function get_date_header(date) {
    const date_object = get_year_month_day(date);
    if (is_today(date_object)) {
        return 'Today';
    } else if (is_yesterday(date_object)) {
        return 'Yesterday';
    }
    else {
        return get_date_string(date_object);
    }
}

export function get_time(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return hours + ':' + minutes;
}

export function date_to_dashed_string(date) {
    const string = date.getYear() + "-" + date.getMonth() + "-" + date.getDate();
    return string;
}

export function years_between(original_date) {
    const date_diff = Date.now() - original_date;
    const date = new Date(date_diff);
    return Math.abs(date.getUTCFullYear() - 1970);
}