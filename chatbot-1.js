const styles = `
    button {
        outline-color: transparent;
        border: 1px solid #DDE1E3;
        background-color: #FFFFFF;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        column-gap: 12px;
        height: 36px;
        padding-inline: 12px;
        min-width: 60px;
        max-width: max-content;
        transition-duration: .2s;
    }

    button.rounded {
        border-radius: 50%;
    }

    button.iconic {
        min-width: unset;
        max-width: unset;
        width: 36px;
        padding-inline: 0;
    }

    button.iconic svg {
        width: 24px;
        height: 24px;
    }

    button.iconic svg > path {
        fill: #ED2B42;
    }

    button:hover {
        background-color: #EBEDEF;
        border-color: #BEC5CA;
        cursor: pointer;
    }

    button:disabled {
        background-color: #FAFAFA;
        border-color: #EBEDEF;
        color: #DDE1E3;
        cursor: not-allowed;
    }

    button.block {
        min-width: unset;
        max-width: unset;
        width: 100%;
        display: flex;
    }

    button.accent,
    button.error {
        border-color: transparent;
        color: #FFFFFF;
    }

    button.accent:disabled,
    button.error:disabled {
        color: rgba(white, .75);
    }

    button.accent {
        background-color: #008FF5;
    }

    button.accent:hover {
        background-color: #0374C7;
    }

    button.accent:disabled {
        background-color: #6EBEF9;
    }

    button.error {
        background-color: #ED2B42;
    }

    button.error:hover {
        background-color: #BF2335;
    }
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="number"],
    input[type="url"],
    input[type="tel"],
    input[type="date"],
    input[type="time"],
    textarea {
        height: 36px;
        outline: none;
        background: #FFFFFF;
        border: 1px solid #DDE1E3;
        border-radius: 4px;
        padding-inline: 12px;
        transition-duration: .2s;
    }

    textarea {
        padding-block: 8px;
        min-height: 96px;
        resize: vertical;
    }

    input[type="text"]::placeholder,
    input[type="email"]::placeholder,
    input[type="password"]::placeholder,
    input[type="number"]::placeholder,
    input[type="url"]::placeholder,
    input[type="tel"]::placeholder,
    input[type="date"]::placeholder,
    input[type="time"]::placeholder,
    textarea::placeholder {
        color: #67747E;
        opacity: 1;
    }

    input[type="text"]:hover,
    input[type="email"]:hover,
    input[type="password"]:hover,
    input[type="number"]:hover,
    input[type="url"]:hover,
    input[type="tel"]:hover,
    input[type="date"]:hover,
    input[type="time"]:hover,
    textarea:hover {
        border-color: #BEC5CA;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="password"]:focus,
    input[type="number"]:focus,
    input[type="url"]:focus,
    input[type="tel"]:focus,
    input[type="date"]:focus,
    input[type="time"]:focus,
    textarea:focus {
        border-color: #008FF5;
        box-shadow: 0 0 0 2px rgba(0, 143, 245, .25);
    }

    #app {
        max-width: 480px;
        margin: 0 auto;
        padding: 2rem;
    }


    h3, p, input {
        margin: 0;
        padding: 0;
        font-size: 14px;
    }
    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 400px;
        height: calc(100vh - 200px);
        overflow: auto;
        background: white;
        right: 30px;
        bottom: 100px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: #FAFAFA;
        border-radius: 10px;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }

    .t-md {
        font-size: 16px;
        font-weight: 600;
    }

    .widget__container .header {
        padding: 12px 16px;
        border-bottom: 1px solid #DDE1E3;
    }

    .widget__container .body {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .widget__container .body .message-thread {
        display: flex;
        flex-direction: column;
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
        border-top: 1px solid  #DDE1E3;
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
        background-color: #008FF5;
        color: #FFFFFF;
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
        border: 1px solid  #008FF5;
        background-color: #DBEDFD;
        color:  #008FF5;
    }

    .response:hover {
        background-color: #A4D6FB;
        border-color: #A4D6FB;
        color: #A4D6FB;
        cursor: pointer;
    }

    .submit-concern{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: 24px;
        background-color: #008FF5;
        color: #FFFFFF;
    }

    .submit-concern:hover{
        background-color: #A4D6FB;
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
        border: 1px solid  #DDE1E3;
        border-top-color: transparent;
        padding: 8px 12px;
    }

    @keyframes typingAnimation {
        0% {
            transform: translateY(0px);
            background-color: #3974EA; /* Replace with your indigo color */
        }
        28% {
            transform: translateY(-6px);
            background-color: #3974EA; /* Replace with your accent color */
        }
        48% {
            transform: translateY(0px);
            background-color: #3974EA; /* Replace with your accent-highlight color */
        }
    }

    .bubble-container {
        background-color: #f8bbd0; /* Replace with your accent-container color */
        padding: 4px 10px;
        display: inline-block;
        border-radius: 20px;
    }

    .typing {
        display: flex;
        align-items: center;
        height: 8px;
        background-color: #EDF7FE;
        border-radius: 20px;
        padding: 6px 10px;
        }

    .typing-wrapper {
        display: flex;
    }

    .bullet {
        width: 6px;
        height: 6px;
        background-color: #5c6ac4; /* Replace with your indigo color */
        border-radius: 50%;
        margin-right: 4px;
        vertical-align: middle;
        display: inline-block;
        animation: typingAnimation 1.5s infinite ease-in-out;
    }

    .bullet:nth-child(1) {
        animation-delay: 200ms;
    }

    .bullet:nth-child(2) {
        animation-delay: 300ms;
    }

    .bullet:last-child {
        animation-delay: 400ms;
        margin-right: 0;
    }

    .thinking-text {
        margin-left: 10px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #67747E;
    }

`;

const MESSAGE_ICON = `
    <i class="icon mdi mdi-rocket-launch-outline" style="color: white;"></i>
`;

const CLOSE_ICON = `
    <i class="icon mdi mdi-close" style="color: white;"></i>
`;

const FIXED = 1
const AI_PROMPT = 2
const CONDITIONAL = 3
const DATA_COLLECTION = 4
const USER_INPUT = 5

let activeBlock;
let activePreset;
let startBlock;
let parsedToken = '';
let isStreaming = false;
let dataCollectedBlock = 0;
let dataCollected = '';
let cardPayload = {};
let messages = [];
let typing = false;
let text = '';

const END_OF_COMPLETION_TOKEN = '<end>';

class MessageWidget {
    constructor(position = "bottom-right") {
        this.position = this.getPosition(position);
        this.open = false;
        this.messages = [];
        this.token = "";
        this.initialize();
    }

    position = "";
    open = false;
    widgetContainer = null;
    conditionalBlock = null;

    getPosition(position) {
        const [vertical, horizontal] = position.split("-");
        return {
        [vertical]: "30px",
        [horizontal]: "30px",
        };
    }

    async initialize() {
        /**
         * Create and append a shadow root element to the document body
         */
        const containerWrapper = document.createElement("div");
        containerWrapper.style.position = "fixed";
        containerWrapper.style.zIndex = 999;
        Object.keys(this.position).forEach(
            (key) => (containerWrapper.style[key] = this.position[key])
        );
        document.body.appendChild(containerWrapper);

        // Create a shadow root for the container
        const containerShadowRoot = containerWrapper.attachShadow({ mode: 'open' });
        const container = document.createElement("div");
        containerShadowRoot.appendChild(container);
        /**
         * Create a shadow root for the button
         */
        const buttonShadowRoot = document.createElement("div");
        container.appendChild(buttonShadowRoot);
        const buttonShadow = buttonShadowRoot.attachShadow({ mode: 'open' });

        /**
         * Create a button element and give it a class of button__container
         */
        const buttonContainer = document.createElement("button");
        buttonContainer.classList.add("button__container");

        /**
         * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
         */
        buttonContainer.style = "display: flex; align-items: center; justify-content: center;";
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
         * Append the button to the button's shadow root
         */
        buttonShadow.appendChild(buttonContainer);

        /**
         * Create a shadow root for the widget container
         */
        const widgetShadowRoot = document.createElement("div");
        container.appendChild(widgetShadowRoot);
        this.widgetShadow = widgetShadowRoot.attachShadow({ mode: 'open' });

        /**
         * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
         */
        this.widgetContainer = document.createElement("div");
        this.widgetContainer.classList.add("widget__hidden", "widget__container");

        /**
         * Append the widget's content to the widget's shadow root
         */
        this.widgetShadow.appendChild(this.widgetContainer);
        this.injectStyles(buttonShadow);
        this.injectStyles(this.widgetShadow);
        this.injectStyles(containerShadowRoot)
    }


    /**
     * Fetch and construct the form.
     * This is called every time the form is opened or closed.
     */
     async createWidgetContent() {
        this.widgetContainer = document.createElement('div');
        this.widgetContainer.className = 'widget__container';

        const header = document.createElement('header');
        header.className = 'header';
        const headerText = document.createElement('p');
        headerText.classList.add('t-md', 'bold');
        headerText.textContent = 'Chat with Zenbot';
        header.appendChild(headerText);
        this.widgetContainer.appendChild(header);

        const body = document.createElement('section');
        body.className = 'body';
        body.setAttribute('id', 'body');
        const messageThread = document.createElement('ul');
        messageThread.setAttribute('id', 'thread');
        messageThread.className = 'message-thread';

        body.appendChild(messageThread);
        this.widgetContainer.appendChild(body);

        const footer = document.createElement('footer');
        footer.className = 'footer';
        const messageField = document.createElement('div');
        messageField.className = 'message-field';
        const textArea = document.createElement('textarea');
        textArea.setAttribute('id', 'input');
        textArea.placeholder = 'Enter message';
        textArea.rows = 10;
        textArea.className = 'block';
        const actions = document.createElement('div');
        actions.className = 'actions';
        const sendButton = document.createElement('button');
        sendButton.className = 'send-button accent iconic rounded';
        sendButton.setAttribute('id', 'button');
        const sendIcon = document.createElement('i');
        sendIcon.className = 'mdi mdi-send mdi-18px';
        sendButton.appendChild(sendIcon);
        actions.appendChild(sendButton);
        messageField.appendChild(textArea);
        messageField.appendChild(actions);
        footer.appendChild(messageField);
        this.widgetContainer.appendChild(footer);

        // Banner container setup
        const headerContainer = document.createElement('header');
        // headerContainer.appendChild(bannerImageEl);
        this.widgetContainer.appendChild(headerContainer);

        // Appending of form to widgetContainer
        const buttonEl = document.createElement('button');
        buttonEl.classList.add('accent');
        buttonEl.classList.add('block');
        buttonEl.innerText = 'Get started!';

        // Attach the widget content to its shadow root
        this.widgetShadow.appendChild(this.widgetContainer);

        this.token = await this.fetchWebsocketToken();
        const url = `ws://localhost:8000/websocket/command-board-chatbot/?token=${this.token}`;
        const websocket = new WebSocket(url);

        websocket.onmessage = (message) => {
            let { payload } = JSON.parse(message.data);
            this.handleAIGeneration(payload);
        };

        this.fetchMessageBlocks().then(activePreset => {
            startBlock = activePreset.message_blocks.find(block => block.pk == activePreset.start_node_id);
            this.setUpMessageBlock(activePreset, startBlock);
        }).catch(error => {
            console.error(error);
        });
        this.setupEventListeners(this.widgetShadow);
    }

    injectStyles(shadowRoot) {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
        shadowRoot.appendChild(styleTag);
        const mdiStylesheet = document.createElement('link');
        mdiStylesheet.rel = 'stylesheet';
        mdiStylesheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.4.47/css/materialdesignicons.css';
        mdiStylesheet.integrity = 'sha512-/bZeHtNhCNHsuODhywlz53PIfvrJbAmm7MUXWle/f8ro40mVNkPLz0I5VdiYyV030zepbBdMIty0Z3PRwjnfmg==';
        mdiStylesheet.crossOrigin = 'anonymous';
        mdiStylesheet.referrerPolicy = 'no-referrer';
        shadowRoot.appendChild(mdiStylesheet);
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
            if (this.widgetContainer) {
                this.widgetContainer = null;
            }
        }
    }

    fetchMessageBlocks() {
        return new Promise((resolve, reject) => {
            const scriptTags = document.querySelectorAll('script');
            let scriptTag;
            for (let item of scriptTags) {
                if (item.attributes.getNamedItem('data-param'))
                    scriptTag = item;
            }


            let pk = 1;

            if (scriptTag && scriptTag.attributes.getNamedItem('data-param')) {
                pk = String(scriptTag.attributes.getNamedItem('data-param').value);
            }
            console.log(pk)
            const url = `http://localhost:8000/api-sileo/v1/ai/conversation-template-message-blocks/filter/?pk=${pk}`;

            const req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const response = JSON.parse(this.responseText);
                        activePreset = response.data[0]
                        resolve(activePreset);
                    } catch (e) {
                        reject(e);
                    }
                }
            }
            req.open('GET', url);
            req.send();
        })
    }

    async setUpMessageBlock(activePreset, block) {
        try {
            if (block) {
                this.activeBlock = block
            } else {
                const nextId = this.conditionalBlock ?
                    this.conditionalBlock.next_id : this.activeBlock ?
                    this.activeBlock.next_id : activePreset.start_node_id;

                this.activeBlock = activePreset.message_blocks.find(block => block.pk ==  nextId);
                this.conditionalBlock = null;
            }
            this.disableInput()
            if (this.activeBlock.type ===FIXED) {
                this.addBotReply(this.activeBlock);
                await this.typewriter();
            } else if(this.activeBlock.type === CONDITIONAL) {
                this.addMessageConditionals(this.activeBlock)
                await this.handleUserResponse(this.activeBlock);
            } else if(this.activeBlock.type === DATA_COLLECTION){
                dataCollected = this.activeBlock.data_collected_kind
                if (this.activeBlock.data_collected_kind == 'description') {
                    cardPayload.description_question = this.activeBlock.text;
                }
                else if (this.activeBlock.data_collected_kind == 'name') {
                    cardPayload.name_question = this.activeBlock.text;
                } else {
                    cardPayload.others_question = this.activeBlock.text;
                }
                this.addBotReply(this.activeBlock)
                await this.typewriter();
            } else if (this.activeBlock.type === AI_PROMPT) {
                this.addTypingIndicator()
                // Clear text in case block was configured to have a text despite being an AI_Prompt
                this.activeBlock.text = '';
                const payload = {
                    pk: this.activeBlock.pk,
                    messages: messages,
                    token: this.token,
                }
                await this.fetchAiCompletion(payload);
                await this.awaitWebSocketResponse();
            } else {
                if (dataCollected) {
                    let text = await this.handleUserResponse(this.activeBlock);
                    cardPayload[dataCollected] = text;
                    this.dataCollected = null;
                }else{
                    await this.handleUserResponse(this.activeBlock);
                }
            }
            if (!this.activeBlock?.next_id && !this.conditionalBlock) {
                this.showSuccessButton();
                return
            }
            // Recursive call
            this.setUpMessageBlock(activePreset)


        } catch (error) {
            console.error(error);
        }
    }

    addBotReply(block) {
        this.removeTypingIndicator()
        const messageThread = this.widgetShadow.getElementById('thread');
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

        if (this.messages) {
            this.messages.unshift({
                content: block.text,
                role: 'assistant'
            });
        }
        recipientMessage.appendChild(recipientMessageHeader);
        recipientMessage.appendChild(recipientMessageText);
        messageRecipient.appendChild(recipientIconContainer);
        messageRecipient.appendChild(recipientMessage);
        messageThread.appendChild(messageRecipient);

        text = block.text;

        this.scrolltoBottom();
    }

    setupEventListeners(shadowRoot) {
        const inputElement = shadowRoot.getElementById('input');
        const submitButton = shadowRoot.getElementById('button');
        const handleSubmit = async () => {
            const userInput = inputElement.value.trim();
            if (userInput === '') return;
            inputElement.value = '';
            await this.addUserReply(userInput);
            this.pendingResolve(userInput); // Resolve the pending promise
        };

        submitButton.addEventListener('click', handleSubmit);
        inputElement.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default enter behavior
                handleSubmit();
            }
        });
    }

    handleUserResponse() {
        if (this.activeBlock.type != CONDITIONAL)
            this.enableInput();
        return new Promise((resolve) => {
            this.pendingResolve = resolve;
        });
    }

    addUserReply(userInput){
        const messageThread = this.widgetShadow.getElementById('thread');
        const messageSender = document.createElement('li');
        messageSender.className = 'message-sender';
        const senderImg = document.createElement('i')
        senderImg.className = 'mdi mdi-account mdi-24px';
        const senderMessage = document.createElement('div');
        senderMessage.className = 'message';
        const senderMessageHeader = document.createElement('p');
        senderMessageHeader.innerHTML = '<strong>You</strong>';
        const senderMessageText = document.createElement('p');
        senderMessageText.textContent = userInput;
        this.messages.unshift({
            content: userInput,
            role: 'user'
        });
        senderMessage.appendChild(senderMessageHeader);
        senderMessage.appendChild(senderMessageText);
        messageSender.appendChild(senderImg);
        messageSender.appendChild(senderMessage);
        messageThread.appendChild(messageSender);
        this.scrolltoBottom();
    }

    fetchWebsocketToken() {
        return new Promise((resolve, reject) => {
            const token = crypto.randomUUID();
            const url = `http://localhost:8000/websocket-boards-chatbot-token/?token=${token}`;
            const req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const response = JSON.parse(this.responseText);
                        resolve(response.token);
                    } catch(e) {
                        reject(e);
                    }
                }
            }
            req.open('GET', url);
            req.send();
        });
    }

    fetchAiCompletion(payload) {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:8000/board/ai-completion`
            const form = new FormData();
            const req = new XMLHttpRequest();

            form.append('auth_token', payload.token);
            form.append('current_state_pk', payload.pk);
            form.append('messages', JSON.stringify(payload.messages));

            req.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const response = JSON.parse(this.responseText);
                        isStreaming = true;
                        resolve(response);
                    } catch(e) {
                        reject(e);
                    }
                }
            }
            req.open('POST', url);
            req.send(form);
        });
    }

    disableInput() {
        let inputElement = this.widgetShadow.getElementById('input');
        let submitButton = this.widgetShadow.getElementById('button');
        inputElement.disabled = true;
        submitButton.disabled = true;
    }

    // Method to enable input and button
    enableInput() {
        let inputElement = this.widgetShadow.getElementById('input');
        let submitButton = this.widgetShadow.getElementById('button');
        inputElement.disabled = false;
        submitButton.disabled = false;
    }

    scrolltoBottom() {
        const chatThread = this.widgetShadow.getElementById('thread');
        chatThread.scrollTop = chatThread.scrollHeight;
    }

    async addMessageConditionals(block) {
        let conditionals = block.block_conditionals;
        this.addBotReply(block);
        await this.typewriter();
        const messageThread = this.widgetShadow.getElementById('thread');

        const messageResponse = document.createElement('li');
        messageResponse.className = 'message-response';

        const responseText = document.createElement('p');
        responseText.className = 'bold c-tertiary';
        responseText.textContent = 'Select your response:';
        messageResponse.appendChild(responseText);

        const responseContainer = document.createElement('div');
        responseContainer.className = 'response-container';

        conditionals.forEach(conditional => {
            const responseButton = document.createElement('div');
            responseButton.className = 'response';
            responseButton.setAttribute('role', 'button');

            const responseIcon = document.createElement('i');
            responseIcon.className = 'mdi mdi-comment-text-outline mdi-18px';

            const responseText = document.createElement('p');
            responseText.textContent = conditional.text;

            responseButton.appendChild(responseIcon);
            responseButton.appendChild(responseText);

            responseButton.addEventListener('click', () => {
                this.conditionalBlock = conditional;
                messageThread.removeChild(messageResponse);

                this.addUserReply(responseText.textContent);
                this.pendingResolve(responseText.textContent);
            });
            responseContainer.appendChild(responseButton);
        });

        messageResponse.appendChild(responseContainer);
        messageThread.appendChild(messageResponse);
    }

    showSuccessButton(){
        const messageThread = this.widgetShadow.getElementById('thread');

        const messageResponse = document.createElement('li');
        messageResponse.className = 'message-response';
        const responseContainer = document.createElement('div');
        responseContainer.className = 'response-container';

        const responseButton = document.createElement('div');
        responseButton.className = 'submit-concern';
        responseButton.setAttribute('role', 'button');

        const responseIcon = document.createElement('i');
        responseIcon.className = 'mdi mdi-rocket mdi-18px';

        const responseText = document.createElement('p');
        responseText.textContent = "Submit Concern";

        responseButton.appendChild(responseIcon);
        responseButton.appendChild(responseText);

        responseButton.addEventListener('click', () => {
            messageThread.removeChild(messageResponse);
            this.prepareCardDetails();

        });
        responseContainer.appendChild(responseButton);        
        messageResponse.appendChild(responseContainer);
        messageThread.appendChild(messageResponse);
        this.scrolltoBottom();
    }

    async handleAIGeneration(payload) {
        if (payload?.message && !payload.message.includes('`')) {
            if (await this._parseMessage(payload.message)) {
                this.activeBlock.text += payload.message;
            } else {
                if (isStreaming === false) {
                    await this.addBotReply(this.activeBlock);
                    await this.typewriter();
                }

                setTimeout(() => {
                    this.pendingResolve(payload.message);
                }, 1000);

            }
        } else if (this.activeBlock.text === "undefined"){
            this.activeBlock.text = ""
        }
    }

    awaitWebSocketResponse(){
        return new Promise((resolve) => {
            this.pendingResolve = resolve;
        });
    }
    async submitConcern(payload){
        const url = `http://localhost:8000/api-sileo/v1/hqzen/command-board-chatbot-internal-card/create/`;
        const form = new FormData();

        for(let field in payload){
            form.append(field, payload[field])
        }

        const response = await fetch(url, {
            method: "POST",
            body: form,
          });
          return response.json();
    }


    async prepareCardDetails() {
        let payload = {
            title: 'User Concern',
            description: { ops: [] },
            board_id: activePreset.object_id,
            total_points: 0,
            is_public: true,
            is_group_estimation_enabled: false,
            date_due: '',
        };

        if (cardPayload.title) {
            payload.title = cardPayload.title;
        }
        if (cardPayload.name) {
            payload.description.ops.push(...[{ attributes: { bold: true },
                                               insert: `${cardPayload.name_question}: ` },
                                             { insert: `${cardPayload.name ?? 'None'}\n` }]);
        }

        if (cardPayload.description) {
            payload.description.ops.push(...[{ attributes: { bold: true },
                                               insert: `${cardPayload.description_question}: ` },
                                             { insert: `${cardPayload.description ?? 'None'}\n` }]);
        }

        if (this.cardPayload?.other) {
            payload.description.ops.push(...[{ attributes: { bold: true },
                                               insert: `${cardPayload.others_question}: ` },
                                             { insert: `${cardPayload.other ?? 'None'}\n` }]);
        }

        payload.description = JSON.stringify(payload.description);

        this.submitConcern(payload);
        alert("Card Created! Thank you for submitting your concern.")
        this.toggleOpen();

    }

    _parseMessage(token) {
        token = token.trim();
        parsedToken = END_OF_COMPLETION_TOKEN.startsWith(parsedToken + token) ?
                        parsedToken + token : '';

        if (parsedToken === END_OF_COMPLETION_TOKEN) {
            isStreaming = false;
            this.activeBlock.isPassed = true;
            return false;
        }

        return !parsedToken.length;
    }

    typewriter() {
        return new Promise((resolve, reject) => {
            const messageRecepients = this.widgetShadow.querySelectorAll('.message-recepient');
            const messages = messageRecepients[messageRecepients.length - 1].getElementsByClassName('message')[0];
            const pTags = messages.getElementsByTagName("p");
            const ptag = pTags[pTags.length - 1];

            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    ptag.innerHTML += text.charAt(i);
                }, i * 8);
            }
            setTimeout(() => {
                resolve();
            }, text.length * 8);
        });
    }

    addTypingAnimation() {
        const messageThread = this.widgetShadow.getElementById('thread');
        const messageRecipient = document.createElement('li');
        messageRecipient.className = 'message-recepient';
        messageRecipient.id = 'typing-indicator'; // Assign an ID to easily remove it later

        const recipientIconContainer = document.createElement('div');
        recipientIconContainer.className = 'icon-container';
        const recipientIcon = document.createElement('i');
        recipientIcon.className = 'mdi mdi-creation mdi-24px';
        recipientIconContainer.appendChild(recipientIcon);

        const recipientMessage = document.createElement('div');
        recipientMessage.className = 'message';

        const recipientMessageHeader = document.createElement('p');
        recipientMessageHeader.innerHTML = '<strong>Zenbot</strong>';

        const typingContainerWrapper = document.createElement('div');
        typingContainerWrapper.className = 'typing-wrapper'; // Wrapper for typing animation and text

        const typingContainer = document.createElement('div');
        typingContainer.className = 'typing';

        for (let i = 0; i < 3; i++) {
            const bullet = document.createElement('div');
            bullet.className = 'bullet';
            typingContainer.appendChild(bullet);
        }

        const thinkingText = document.createElement('span');
        thinkingText.className = 'thinking-text';
        thinkingText.textContent = 'Zenbot is thinking...';

        typingContainerWrapper.appendChild(typingContainer);
        typingContainerWrapper.appendChild(thinkingText);

        recipientMessage.appendChild(recipientMessageHeader);
        recipientMessage.appendChild(typingContainerWrapper);

        messageRecipient.appendChild(recipientIconContainer);
        messageRecipient.appendChild(recipientMessage);
        messageThread.appendChild(messageRecipient);

        this.scrolltoBottom();
    }


    addTypingIndicator() {
        this.addTypingAnimation();
    }

    removeTypingIndicator() {
        const typingIndicator = this.widgetShadow.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
