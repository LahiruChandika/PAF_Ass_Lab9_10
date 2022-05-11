$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});

$(document).on("click", "#btnSave", function()
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
 var type = ($("#hidInquiryIDSave").val() == "") ? "POST" : "PUT"; 
 $.ajax(
 {
 url : "InquiriesAPI",
 type : type,
 data : $("#formItem").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
 onInquirySaveComplete(response.responseText, status);
 }
 }); 
});

function onInquirySaveComplete(response, status)
{
	if (status == "success")
 	{
 		var resultSet = JSON.parse(response);
 		if (resultSet.status.trim() == "success")
 		{
 			$("#alertSuccess").text("Successfully saved.");
 			$("#alertSuccess").show();
			
 			$("#divItemsGrid").html(resultSet.data);
			
 		} else if (resultSet.status.trim() == "error")
 			{
			 	$("#alertError").text(resultSet.data);
 			 	$("#alertError").show();
 			}	
 	} else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} else
 			{
 				$("#alertError").text("Unknown error while saving..");
 				$("#alertError").show();
 			} 
 $("#hidInquiryIDSave").val("");
 $("#formItem")[0].reset();

 
}



$(document).on("click", ".btnRemove", function()
{
 $.ajax(
 {
 url : "InquiriesAPI",
 type : "DELETE",
 data : "inquiryID=" + $(this).data("inquiryid"),
 dataType : "text",
 complete : function(response, status)
 {
 onInquiryDeleteComplete(response.responseText, status);
 }
 });

function onInquiryDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}
});






$(document).on("click", ".btnUpdate", function()
{
 $("#hidInquiryIDSave").val($(this).data("inquiryid"));
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
