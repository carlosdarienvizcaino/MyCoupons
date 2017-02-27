/**
 * Created by Carlos on 2/26/2017.
 */

module.exports = MinimalCoupon;

function MinimalCoupon(id, name, domain, subject, snippet, date, errorMessage) {
  this.id = id || '';
  this.name = name || '';
  this.domain = domain || '';
  this.subject = subject || '';
  this.snippet = snippet || '';
  this.date = date || '';
}

