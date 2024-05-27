const styles = `
    @import url('./reset.css');
    @import url('./components/button.css');
    @import url('./components/input.css');
    @import url('./components/select.css');
    @import url('./components/thumbnail.css');

    #app {
        max-width: 480px;
        margin: 0 auto;
        padding: 2rem;
    }


    h3, p, input {
        margin: 0;
        padding: 0;
    }
    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 400px;
        overflow: auto;
        right: 30px;
        top: 75px;
        bottom: 100px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: var(--color-container);
        border-radius: 10px;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
    .widget__container .header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--color-border);
    }

    .widget__container .body {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .widget__container .body .message-thread {
        display: flex;
        flex-direction: column-reverse;
        overflow: hidden auto;
        height: 100%;
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
        margin: 0;
        padding: 12px 0;
    }

    .widget__container .body .message-thread li {
        list-style: none;
    }

    .widget__container .footer {
        padding: 12px;
        border-top: 1px solid var(--color-border);
    }
    .widget__icon {
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        transition: transform .3s ease;
    }
    .widget__hidden {
        transform: scale(0);
    }
    .button__container {
        border: none;
        background-color: #0f172a;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
    .widget__container.hidden {
        max-height: 0px;
    }
    .widget__header {
        padding: 1rem 2rem 1.5rem;
        background-color: #000;
        color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
    }
    .widget__header h3 {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 8px;
    }
    .message-sender,
    .message-recepient {
        display: flex;
        gap: 16px;
        padding: 12px 16px;
    }

    .message-sender .message,
    .message-recepient .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .message-sender img {
        display: inline-block;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .message-recepient .icon-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        background-color: var(--color-accent);
        color: var(--color-white);
        flex-shrink: 0;
    }

    .message-response {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 12px;
    }

    .response-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
    }

    .response {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 24px;
        border: 1px solid var(--color-accent);
        background-color: var(--color-accent-highlight);
        color: var(--color-accent);
    }

    .response:hover {
        background-color: var(--color-accent-highlight-hover);
        border-color: var(--color-accent-hover);
        color: var(--color-accent-hover);
        cursor: pointer;
    }

    .message-field {
        display: flex;
        flex-direction: column;
    }

    .message-field textarea {
        border-radius: 4px 4px 0 0;
    }

    .message-field .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0 0 4px 4px;
        border: 1px solid var(--color-border);
        border-top-color: transparent;
        padding: 8px 12px;
    }

`;

const MESSAGE_ICON = `
    <i class="icon mdi mdi-rocket-launch-outline" style="color: white;"></i>
`;

const CLOSE_ICON = `
    <i class="icon mdi mdi-close" style="color: white;"></i>
`;

class MessageWidget {
    constructor(position = "bottom-right") {
        this.position = this.getPosition(position);
        this.open = false;
        this.initialize();
        this.injectStyles();
    }

    position = "";
    open = false;
    widgetContainer = null;

    getPosition(position) {
        const [vertical, horizontal] = position.split("-");
        return {
        [vertical]: "30px",
        [horizontal]: "30px",
        };
    }

    async initialize() {
        /**
         * Create and append a div element to the document body
         */
        const container = document.createElement("div");
        container.style.position = "fixed";
        Object.keys(this.position).forEach(
        (key) => (container.style[key] = this.position[key])
        );
        document.body.appendChild(container);

        /**
         * Create a button element and give it a class of button__container
         */
        const buttonContainer = document.createElement("button");
        buttonContainer.classList.add("button__container");

        /**
         * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
         */
        buttonContainer.style = "display: flex; align-items: center; justify-content: center;"
        const widgetIconElement = document.createElement("span");
        widgetIconElement.innerHTML = MESSAGE_ICON;
        widgetIconElement.classList.add("widget__icon");
        this.widgetIcon = widgetIconElement;

        /**
         * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
         */
        const closeIconElement = document.createElement("span");
        closeIconElement.innerHTML = CLOSE_ICON;
        closeIconElement.classList.add("widget__icon", "widget__hidden");
        this.closeIcon = closeIconElement;

        /**
         * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
         */
        buttonContainer.appendChild(this.widgetIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

        /**
         * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
         */
        this.widgetContainer = document.createElement("div");
        this.widgetContainer.classList.add("widget__hidden", "widget__container");
    
        /**
         * Append the widget's content and the button to the container
        */
        container.appendChild(this.widgetContainer);
        container.appendChild(buttonContainer);
    }

    /**
     * Fetch and construct the form.
     * This is called every time the form is opened or closed.
     */
    async createWidgetContent() {
            console.log("haweg")
        const appDiv = document.createElement('div');
        appDiv.id = 'app';
        document.body.appendChild(appDiv);

        this.widgetContainer = document.createElement('div');
        this.widgetContainer.className = 'widget__container';

        const header = document.createElement('header');
        header.className = 'header';
        const headerText = document.createElement('p');
        headerText.className = 't-md bold';
        headerText.textContent = 'Chat with Zenbot';
        header.appendChild(headerText);
        this.widgetContainer.appendChild(header);

        const body = document.createElement('section');
        body.className = 'body';
        const messageThread = document.createElement('ul');
        messageThread.className = 'message-thread';

        const messageResponse = document.createElement('li');
        messageResponse.className = 'message-response';
        const responseText = document.createElement('p');
        responseText.className = 'bold c-tertiary';
        responseText.textContent = 'Select your response:';
        messageResponse.appendChild(responseText);

        const responseContainer = document.createElement('div');
        responseContainer.className = 'response-container';

        const responseButton1 = document.createElement('div');
        responseButton1.className = 'response';
        responseButton1.setAttribute('role', 'button');
        const responseIcon1 = document.createElement('i');
        responseIcon1.className = 'mdi mdi-comment-text-outline mdi-18px';
        const responseText1 = document.createElement('p');
        responseText1.textContent = 'Response';
        responseButton1.appendChild(responseIcon1);
        responseButton1.appendChild(responseText1);

        const responseButton2 = document.createElement('div');
        responseButton2.className = 'response';
        responseButton2.setAttribute('role', 'button');
        const responseIcon2 = document.createElement('i');
        responseIcon2.className = 'mdi mdi-sync mdi-18px';
        const responseText2 = document.createElement('p');
        responseText2.textContent = 'Regenerate';
        responseButton2.appendChild(responseIcon2);
        responseButton2.appendChild(responseText2);

        responseContainer.appendChild(responseButton1);
        responseContainer.appendChild(responseButton2);
        messageResponse.appendChild(responseContainer);
        messageThread.appendChild(messageResponse);

        const messageSender = document.createElement('li');
        messageSender.className = 'message-sender';
        const senderImg = document.createElement('img');
        const senderMessage = document.createElement('div');
        senderMessage.className = 'message';
        const senderMessageHeader = document.createElement('p');
        senderMessageHeader.innerHTML = '<strong>You</strong>';
        const senderMessageText = document.createElement('p');
        senderMessageText.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, officiis veritatis optio libero suscipit laborum unde reiciendis accusamus corporis tempore.';
        senderMessage.appendChild(senderMessageHeader);
        senderMessage.appendChild(senderMessageText);
        messageSender.appendChild(senderImg);
        messageSender.appendChild(senderMessage);
        messageThread.appendChild(messageSender);

        const messageRecipient = document.createElement('li');
        messageRecipient.className = 'message-recepient';
        const recipientIconContainer = document.createElement('div');
        recipientIconContainer.className = 'icon-container';
        const recipientIcon = document.createElement('i');
        recipientIcon.className = 'mdi mdi-creation mdi-24px';
        recipientIconContainer.appendChild(recipientIcon);
        const recipientMessage = document.createElement('div');
        recipientMessage.className = 'message';
        const recipientMessageHeader = document.createElement('p');
        recipientMessageHeader.innerHTML = '<strong>Zenbot</strong>';
        const recipientMessageText = document.createElement('p');
        recipientMessageText.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, officiis veritatis optio libero suscipit laborum unde reiciendis accusamus corporis tempore.';
        recipientMessage.appendChild(recipientMessageHeader);
        recipientMessage.appendChild(recipientMessageText);
        messageRecipient.appendChild(recipientIconContainer);
        messageRecipient.appendChild(recipientMessage);
        messageThread.appendChild(messageRecipient);

        body.appendChild(messageThread);
        this.widgetContainer.appendChild(body);

        const footer = document.createElement('footer');
        footer.className = 'footer';
        const messageField = document.createElement('div');
        messageField.className = 'message-field';
        const textArea = document.createElement('textarea');
        textArea.placeholder = 'Enter message';
        textArea.rows = 10;
        textArea.className = 'block';
        const actions = document.createElement('div');
        actions.className = 'actions';
        const sendButton = document.createElement('button');
        sendButton.className = 'send-button accent iconic rounded';
        const sendIcon = document.createElement('i');
        sendIcon.className = 'mdi mdi-send mdi-18px';
        sendButton.appendChild(sendIcon);
        actions.appendChild(sendButton);
        messageField.appendChild(textArea);
        messageField.appendChild(actions);
        footer.appendChild(messageField);
        this.widgetContainer.appendChild(footer);

        document.body.appendChild(this.widgetContainer);
        // Banner container setup
        const headerContainer = document.createElement('header');
        headerContainer.appendChild(bannerImageEl);
        this.widgetContainer.appendChild(headerContainer);
        console.log("haha")

        // Appending of form to widgetContainer
        const buttonEl = document.createElement('button');
        buttonEl.classList.add('accent');
        buttonEl.classList.add('block');
        buttonEl.innerText = 'Get started!';
    }

    injectStyles() {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
        document.head.appendChild(styleTag);
    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.createWidgetContent();
            this.widgetIcon.classList.add("widget__hidden");
            this.closeIcon.classList.remove("widget__hidden");
            this.widgetContainer.classList.remove("widget__hidden");
        } else {
            this.widgetIcon.classList.remove("widget__hidden");
            this.closeIcon.classList.add("widget__hidden");
            this.widgetContainer.classList.add("widget__hidden");
            this.widgetContainer.innerHTML = '';
        }
    }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
