$(document).ready(function() {
    // Function to send the selected stock ticker to the server
    function sendMessage() {
        var selectedTicker = $("#stockTickerSelect").val();
        // Show a loading message while waiting for the response
        updateBotMessage("Processing...");

        $.ajax({
            url: '/process-message',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ userMessage: selectedTicker }),
            success: function(response) {
                var botResponse = response.botResponse;
                updateBotMessage(botResponse);
            },
            error: function(error) {
                console.error(error);
                updateBotMessage("Error processing request.");
            }
        });
    }

    // Function to update the bot message in the chat area
    function updateBotMessage(message, reset = false) {
        var chatMessages = $("#chatMessages");
        var botMessage = $("<div>").addClass("bot-message");
        if (reset) {
            botMessage.addClass("initial-message"); // Apply initial message styling
        }
        botMessage.text(message);
        chatMessages.empty(); // Clear existing messages
        chatMessages.append(botMessage);
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }

    // Bind the submit button click event to send the message
    $("#submitButton").click(sendMessage);

    // Bind the reset button click event to reset the conversation
    $("#resetButton").click(function() {
        updateBotMessage("Conversation has been reset. Please select a stock ticker to continue.", true);
    });
    
});
