$(document).ready(function() {
    // Function to send the selected stock ticker to the server
    function sendMessage() {
        var selectedTicker = $("#stockTickerSelect").val();
        // Show a loading message while waiting for the response
        updateBotMessage("Bot is processing, please wait...");

        $.ajax({
            url: '/process-message',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ userMessage: selectedTicker }),
            success: function(response) {
                var botResponse = response.botResponse;
                updateBotMessage("Bot Response: " + botResponse);
            },
            error: function(error) {
                console.error(error);
                updateBotMessage("Error processing request.");
            }
        });
    }

    // Function to update the bot message in the chat area
    function updateBotMessage(message) {
        var chatMessages = $("#chatMessages");
        var botMessage = $("<div>").addClass("bot-message").text(message);
        chatMessages.empty(); // Clear existing messages
        chatMessages.append(botMessage);
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }

    // Bind the submit button click event to send the message
    $("#submitButton").click(sendMessage);
});
