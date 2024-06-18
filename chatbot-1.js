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

    .submit-concern{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: 24px;
        background-color: var(--color-accent);
        color: var(--color-white);
    }
    
    .submit-concern:hover{
        background-color: var(--color-accent-hover);
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

const END_OF_COMPLETION_TOKEN = '<end>';

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
        body.setAttribute('id', 'body')
        const messageThread = document.createElement('ul');
        messageThread.setAttribute('id', 'thread')
        messageThread.className = 'message-thread';


        // const messageRecipient = document.createElement('li');
        // messageRecipient.className = 'message-recepient';
        // const recipientIconContainer = document.createElement('div');
        // recipientIconContainer.className = 'icon-container';
        // const recipientIcon = document.createElement('i');
        // recipientIcon.className = 'mdi mdi-creation mdi-24px';
        // recipientIconContainer.appendChild(recipientIcon);
        // const recipientMessage = document.createElement('div');
        // recipientMessage.className = 'message';
        // const recipientMessageHeader = document.createElement('p');
        // recipientMessageHeader.innerHTML = '<strong>Zenbot</strong>';
        // const recipientMessageText = document.createElement('p');
        // recipientMessageText.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, officiis veritatis optio libero suscipit laborum unde reiciendis accusamus corporis tempore.';
        // recipientMessage.appendChild(recipientMessageHeader);
        // recipientMessage.appendChild(recipientMessageText);
        // messageRecipient.appendChild(recipientIconContainer);
        // messageRecipient.appendChild(recipientMessage);
        // messageThread.appendChild(messageRecipient);

        // const messageSender = document.createElement('li');
        // messageSender.className = 'message-sender';
        // // const senderImg = document.createElement('img');
        // const senderImg = document.createElement('i')
        // senderImg.className = 'mdi mdi-account mdi-24px';
        // const senderMessage = document.createElement('div');
        // senderMessage.className = 'message';
        // const senderMessageHeader = document.createElement('p');
        // senderMessageHeader.innerHTML = '<strong>You</strong>';
        // const senderMessageText = document.createElement('p');
        // senderMessageText.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, officiis veritatis optio libero suscipit laborum unde reiciendis accusamus corporis tempore.';
        // senderMessage.appendChild(senderMessageHeader);
        // senderMessage.appendChild(senderMessageText);
        // messageSender.appendChild(senderImg);
        // messageSender.appendChild(senderMessage);
        // messageThread.appendChild(messageSender);

        body.appendChild(messageThread);
        this.widgetContainer.appendChild(body);

        const footer = document.createElement('footer');
        footer.className = 'footer';
        const messageField = document.createElement('div');
        messageField.className = 'message-field';
        const textArea = document.createElement('textarea');
        textArea.setAttribute('id', 'input')
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

        document.body.appendChild(this.widgetContainer);
        // Banner container setup
        const headerContainer = document.createElement('header');
        // headerContainer.appendChild(bannerImageEl);
        this.widgetContainer.appendChild(headerContainer);

        // Appending of form to widgetContainer
        const buttonEl = document.createElement('button');
        buttonEl.classList.add('accent');
        buttonEl.classList.add('block');
        buttonEl.innerText = 'Get started!';

        activePreset = await this.fetchMessageBlocks();
        cardPayload["board_id"]=activePreset.object_id;
        this.setupEventListeners();

        this.token = await this.fetchWebsocketToken();
        const url = `ws://localhost:8000/websocket/command-board-chatbot/?token=${this.token}`;
        const websocket = new WebSocket(url);

        websocket.onmessage = (message) => {
            let { payload } = JSON.parse(message.data);
            this.handleAIGeneration(payload)
        }

        this.fetchMessageBlocks().then(activePreset => {
        startBlock = activePreset.message_blocks.find(block => block.pk == activePreset.start_node_id);
        this.setUpMessageBlock(activePreset, startBlock);
        }).catch(error => {
            console.error(error);
        });
        this.setupEventListeners();

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
            if (this.widgetContainer) {
                document.body.removeChild(this.widgetContainer);
                this.widgetContainer = null;
            }
        }
    }

    fetchMessageBlocks() {
        return new Promise((resolve, reject) => {
            const conversationTemplatePk = 67;
            const url = `http://localhost:8000/api-sileo/v1/ai/conversation-template-message-blocks/filter/?pk=${conversationTemplatePk}`;
            
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
        console.log(block)
        try {
            if (block) {
                this.activeBlock = block
            } else {
                const nextId = this.conditionalBlock ? this.conditionalBlock.next_id : this.activeBlock ? this.activeBlock.next_id : null;
                this.activeBlock = activePreset.message_blocks.find(block => block.pk ==  nextId);
                this.conditionalBlock = null;
            }
            if (this.activeBlock.type ===FIXED) {
                this.addBotReply(this.activeBlock);
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
            } else if (this.activeBlock.type === AI_PROMPT) {
                const payload = {
                    pk: this.activeBlock.pk,
                    messages: messages,
                    token: this.token,
                }
                await this.fetchAiCompletion(payload);
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

    addBotReply(block){
        this.disableInput()
        const messageThread = document.getElementById('thread');
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
        recipientMessageText.textContent = block.text;
        messages.unshift({
            content: block.text,
            role: 'assistant'
        });
        recipientMessage.appendChild(recipientMessageHeader);
        recipientMessage.appendChild(recipientMessageText);
        messageRecipient.appendChild(recipientIconContainer);
        messageRecipient.appendChild(recipientMessage);
        messageThread.appendChild(messageRecipient);
        this.scrolltoBottom();
    }

    setupEventListeners() {
        const inputElement = document.getElementById('input');
        const submitButton = document.getElementById('button');
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
        this.enableInput();
        return new Promise((resolve) => {
            this.pendingResolve = resolve;
        });
    }

    addUserReply(userInput){
        const messageThread = document.getElementById('thread');
        const messageSender = document.createElement('li');
        messageSender.className = 'message-sender';
        // const senderImg = document.createElement('img');
        const senderImg = document.createElement('i')
        senderImg.className = 'mdi mdi-account mdi-24px';
        const senderMessage = document.createElement('div');
        senderMessage.className = 'message';
        const senderMessageHeader = document.createElement('p');
        senderMessageHeader.innerHTML = '<strong>You</strong>';
        const senderMessageText = document.createElement('p');
        senderMessageText.textContent = userInput;
        messages.unshift({
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
        let inputElement = document.getElementById('input');
        let submitButton = document.getElementById('button');
        inputElement.disabled = true;
        submitButton.disabled = true;
    }

    // Method to enable input and button
    enableInput() {
        let inputElement = document.getElementById('input');
        let submitButton = document.getElementById('button');
        inputElement.disabled = false;
        submitButton.disabled = false;
    }

    scrolltoBottom() {
        const chatThread = document.getElementById('thread');
        chatThread.scrollTop = chatThread.scrollHeight;
    }

    addMessageConditionals(block) {
        let conditionals = block.block_conditionals;
        this.addBotReply(block);
        const messageThread = document.getElementById('thread');

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
        const messageThread = document.getElementById('thread');

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

    handleAIGeneration(payload) {
        if (payload?.message && !payload.message.includes('`')) {
            activeBlock.isRetrying = false;
            activeBlock.isThinking = false;
            if (this._parseMessage(payload.message)) {
                activeBlock.text += payload.message;
                if (isStreaming === false) {
                    this.addBotReply(activeBlock);
                }
            }
        }
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
            activeBlock.isPassed = true;
            return false;
        }

        return !parsedToken.length;
    }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
