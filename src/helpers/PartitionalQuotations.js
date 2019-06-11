/**
 * Partitional the quotations between the dates.
 * @param {string} arrivalDate Example yyyy/mm/dd.
 * @param {string} departureDate Example yyyy/mm/dd.
 */

function PartitionalQuotations(arrivalDate, departureDate) {
  // First Dates.
  var firstDate = new Date(arrivalDate);
  var endDate = new Date(departureDate);

  // Get the range between the firstDate and endDate.
  var timeDiff = (endDate - firstDate) / (1000 * 60 * 60 * 24);
  // If the dates are equals, add a additional day.

  // Variable range of the days.
  var missingDays = timeDiff;
  // Copy of the originals dates.
  var firstDateCopy = firstDate;
  // Copy the original day with day one.
  var fisrtDateDefaultDay = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    1
  );

  // Months between years.
  var months = (endDate.getFullYear() - firstDate.getFullYear()) * 12;
  months += endDate.getMonth() - firstDate.getMonth();
  // Months of the day.
  var daysMonth = 0;

  // Array fot the formatted object.
  const quotations = [];

  // Result of the multiple for detect the changing year.
  var multipleResult = 0;

  // Arrival date needs to be less or equal to departure date.
  if (firstDate.getTime() > endDate.getTime()) {
    return "The arrival date could be greater than departure date.";
  }

  for (var i = 0, j = firstDate.getMonth(); i <= months; i++, j++) {
    // Get the days of the actual month.
    daysMonth = getMonthDays(
      fisrtDateDefaultDay.getMonth(),
      fisrtDateDefaultDay.getFullYear()
    );
    // Different cases for the dates.
    if (missingDays === timeDiff) {
      // Get the days of the first date.
      const firstDateDays = firstDate.getDate();
      // Substract the days of the actual month with the days of the first date.
      var firstQuotation = daysMonth - firstDateDays;
      // If the months are equal to zero, set the missing days, otherwise set the days of the first quotation.
      const firstQuotationDays = months === 0 ? missingDays : firstQuotation;
      // If the first date is less than daysMonths and firstdate is equal to enddate, set the days of the enddate, otherwise, set daysmonth.
      const endDateFirstQuotation =
        firstDate.getDate() < daysMonth &&
        firstDate.getFullYear() === endDate.getFullYear() &&
        firstDate.getMonth() === endDate.getMonth()
          ? endDate.getDate()
          : daysMonth;
      // If the firstQuotatios is zero, set one.
      firstQuotation = firstQuotation === 0 ? 1 : firstQuotation;
      // Subtract missingdays with firstQuotation to set the global missingdays.
      missingDays = missingDays - firstQuotation;
      quotations.push(
        setDates(
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/${firstDateDays}`
          ),
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/${endDateFirstQuotation}`
          ),
          firstQuotationDays + 1
        )
      );
    } else if (missingDays > daysMonth) {
      // Subtract missingdays with firstQuotation to set the global missingdays.
      missingDays = missingDays - daysMonth;
      quotations.push(
        setDates(
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/1`
          ),
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/${daysMonth}`
          ),
          daysMonth
        )
      );
    } else if (missingDays < daysMonth) {
      const days =
        missingDays != endDate.getDate() ? missingDays + 1 : missingDays;
      quotations.push(
        setDates(
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/1`
          ),
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/${endDate.getDate()}`
          ),
          days
        )
      );
    } else {
      quotations.push(
        setDates(
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/1`
          ),
          new Date(
            `${fisrtDateDefaultDay.getFullYear()}/${fisrtDateDefaultDay.getMonth() +
              1}/${missingDays}`
          ),
          missingDays
        )
      );
      missingDays = missingDays - daysMonth;
    }
    missingDays = missingDays === 0 ? 1 : missingDays;

    // Add one to the actual month.
    fisrtDateDefaultDay.setMonth(fisrtDateDefaultDay.getMonth() + 1);
  }

  // return Array of objects
  return quotations;
}

// Get the days of the month.
function getMonthDays(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Return a formatted object.
function setDates(arrivalDate, departureDate, daysRange) {
  return {
    arrivalDate: arrivalDate,
    departureDate: departureDate,
    days: daysRange
  };
}

module.exports = PartitionalQuotations;
