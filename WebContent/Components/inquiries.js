$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();

// Form validation-------------------
var status = validateItemForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
 $("#formItem").submit();
$("#alertSuccess").text(status);
 $("#alertSuccess").show();
return;

});

$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidInquiryIDSave").val($(this).closest("tr").find('#hidInquryIDUpdate').val());
 $("#accountNum").val($(this).closest("tr").find('td:eq(0)').text());
 $("#Name").val($(this).closest("tr").find('td:eq(1)').text());
 $("#contactNum").val($(this).closest("tr").find('td:eq(2)').text());
 $("#email").val($(this).closest("tr").find('td:eq(3)').text());
 $("#inquiryDet").val($(this).closest("tr").find('td:eq(4)').text());
});
// CLIENT-MODEL================================================================
function validateItemForm()
{
// Account number
if ($("#accountNum").val().trim() == "")
 {
 return "Insert Account number.";
 }
// Customer name
if ($("#Name").val().trim() == "")
 {
 return "Insert Customer name.";
 }
// Contact number
if ($("#contactNum").val().trim() == "")
 {
 return "Insert Contact number.";
 }
// is numerical value
var tmpContact = $("#contactNum").val().trim();
if (!$.isNumeric(tmpContact))
 {
 return "Insert a numerical value for Contact number.";
 }

// Email address
if ($("#email").val().trim() == "")
 {
 return "Insert Email address.";
 }
// Inquiry details
if ($("#inquiryDet").val().trim() == "")
 {
 return "Insert your Inquiry.";
 }
return true;
}


