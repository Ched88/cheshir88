<template>
    <div id="app">
        <div id="chatForm">
                <div class="chat-window">

                    <div class="nav-panel">
                            <ul class="">
                                <!-- TODO: add counter to unread msgs -->
                              <li class="item" v-on:click="dataUri = 'global_chat'"><a href="#"><span>Global chat</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_profile'"><a href="#"><span>My profile</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_friends'"><a href="#"><span>My friends</span></a></li>
                              <li class="item" v-on:click="dataUri = 'private_chat'"><a href="#"><span>Private chat</span></a></li>
                              <input type="button" value="Logout" class="logout-btn" v-on:click="logout()">
                            </ul>
                    </div>
                    <div class="chat">
                        <div v-if="dataUri === 'private_chat'">
                             <div class="friend-window">
                             Choose a person to talk:
                              <ul>
                                <li clas v-for="item in user.friends" :key="item.id">
                                    <a v-on:click="openPrivateChat(item)" class="friedns-list" href="#">
                                        <span>{{ item.name }}</span>
                                        <span class="badge">{{ item.unreadCount }}</span>
                                    </a>
                                </li>
                              </ul>
                            </div> 
                        </div>
                        <div v-if="dataUri === 'private_chat_messages'">    
                            <!-- TODO: ADD PRIVATE CHAT -->
                            <div class="chat-list">
                                <li v-for="item in private_messages[someone.id]" :key="item.id">
                                    <b>{{ item.fromName }}:</b> {{ item.text }}
                                </li>
                            </div>
                            <div class="input-area">
                            <div class="input-wrapper"><input v-model="privateChatText" v-on:keyup.enter="sendPrivateMessage(privateChatText)" type="textarea" value="" placeholder="write something..."></div>
                            <input v-on:click="sendPrivateMessage(privateChatText)" type="button" value="Send" class="send-btn">
                            </div>
                        </div>
                        <div v-if="dataUri === 'global_chat'">    
                            <div class="chat-list">
                                  <li v-for="item in messages" :key="item._id">
                                <b>{{ item.fromName }}:</b> {{ item.text }}
                                </li>
                            </div>
                            <div class="input-area">
                            <div class="input-wrapper"><input v-model="globalChatText" v-on:keyup.enter="sendMessage(globalChatText)" type="textarea" value="" placeholder="write something..."></div>
                            <input v-on:click="sendMessage(globalChatText)" type="button" value="Send" class="send-btn">
                            </div>
                        </div>
                        <div v-if="dataUri === 'my_profile'">
                           <div class="profile-window">
                            <div class="input-area-profile">
                                <div><span class="span-profile">Status</span></div>
                                    <div class="input-status">
                                        <div class="input-wrapper-profile"><input v-model="user.status" type="textarea" value="" placeholder="write something..."></div>
                                    </div>
                                        <div><span class="span-profile">Name</span></div>
                                <div class="input-name">
                                    <div class="input-wrapper-profile"><input v-model="user.name" type="textarea" value="" placeholder="write something..." ></div>
                                </div>
                                        <div><span class="span-profile">City</span></div>
                                <div class="input-city">
                                        <div class="input-wrapper-profile"><input v-model="user.city" type="textarea" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Phone number</span></div>
                                <div class="input-phone-number">
                                        <div class="input-wrapper-profile"><input v-model="user.phone" type="tel" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Email</span></div>
                                <div class="input-email">
                                        <div class="input-wrapper-profile"><input v-model="user.email" type="email" value="" placeholder="write something..."></div>
                                </div>
                                <input type="button" value="Submit" class="submit-btn-profile" v-on:click="submitUserData()" >
                            </div>
                        </div>
                        </div>

                        <div v-if="dataUri === 'my_friends'">
                            <div class="friend-window">
                             {{user.name}} friends:
                              <ul>
                                <li clas v-for="item in user.friends" :key="item.id">
                                    <a v-on:click="onSomeoneClick(item)" class="friedns-list" href="#"><span>{{ item.name }}</span></a>
                                </li>
                              </ul>
                            </div> 
                        </div>
                    </div>

                    <div class="online-list">
                        <span class="span-online-users">Users:</span>
                        <li class="online-list-item" v-on:click="onSomeoneClick(item)" v-for="item in userList" :key="item._id">
                        <a class="online-list-a"><span >{{ item.name }}</span></a>
                        <span v-if="friendSign(item)" class="friend-sign"> <img :src="require('./friend_icon.png')" /></span>
                        <span v-if="item.online" class="online-sign"> online</span>
                        <!--TODO: add sign to online users -->
                        </li>
                    </div>
                     <div v-if="dataUri === 'someone_profile'">
                         <div class="someone-profile-window">
                                <div class="input-area-someone-profile">
                                    <div><span class="span-someone-profile">Status</span></div>
                                        <div class="input-status">
                                            <div class="input-wrapper-someone-profile"><input v-model="someone.status" type="textarea" readonly value="" ></div>
                                        </div>
                                            <div><span class="span-someone-profile">Name</span></div>
                                    <div class="input-name">
                                        <div class="input-wrapper-someone-profile"><input v-model="someone.name" type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">City</span></div>
                                    <div class="input-city">
                                            <div class="input-wrapper-someone-profile"><input v-model="someone.city" type="textarea" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">Phone number</span></div>
                                    <div class="input-phone-number">
                                            <div class="input-wrapper-someone-profile"><input v-model="someone.phone" type="tel" readonly value="" ></div>
                                    </div>
                                            <div><span class="span-someone-profile">Email</span></div>
                                    <div class="input-email">
                                            <div class="input-wrapper-someone-profile"><input v-model="someone.email" type="email" readonly value="" ></div>
                                    </div>
                                    <input type="button" v-if="!someone.isFriend" v-on:click="addFriend()" value="+ Add to friends" class="add-to-friends-btn">
                                    <input type="button" v-if="someone.isFriend" v-on:click="removeFriend()" value="Remove friend" class="add-to-friends-btn">
                                </div>
                            </div>
                     </div>
                    
                </div>
        </div>
    </div> 
</template>

<script>
    const axios = require('axios');
    const backendUrl = 'http://localhost:3000';
    const backendWS = 'ws://localhost:3000';

    export default {
        data: function () {
            return {
                connection: null,
                dataUri: 'global_chat',

                userId: null,
                usertToken: null,
                user: {
                    friends: [],
                },
                someone: {},
                friend: {},
                globalChatText: '',
                privateChatText: '',
                
                userList: [],
                messages: [],
                private_messages: {},
            };
        },

        created() {
            this.userId = $cookies.get('userId');
            this.usertToken = $cookies.get('userToken');

            if (this.usertToken === null) {
                window.location.href = '/loginForm.html';
            } else {
                this.connection = new WebSocket(`${backendWS}/chat/${this.userId}`);
                this.connection.onmessage = (event) => {
                    this.onMessageReceived(JSON.parse(event.data));
                };
            }
        },

        mounted() {
            axios.defaults.withCredentials = true;

            axios.get(`${backendUrl}/users/`)
                .then(response => { this.userList = response.data.filter(e => e.id !== this.userId);});
            axios.get(`${backendUrl}/messages/`)
                .then(response => { this.messages = response.data });
            axios.get(`${backendUrl}/users/${this.userId}`)
                .then(response => { 
                    response.data.friends.forEach(e => {
                        e.unreadCount = 0;
                    });
                    this.user = response.data;
                });
            // axios.get(`${backendUrl}/messages/5eca6d7ac4af8618503b323e/5eca7240b50de606c084494b`)
            //     .then(response => {this.private_messages = response.data});
        },

        methods: {
            
            logout() {
                $cookies.remove('userToken');
                window.location.href = '/loginForm.html';
            },
            submitUserData() {
                axios.post(`${backendUrl}/users/${this.userId}`, this.user);
            },
            onSomeoneClick(someone) {
                axios.get(`http://localhost:3000/users/${someone.id}`)
                    .then(response => { 
                        this.someone = response.data;
                        this.someone.isFriend = this.user.friends.some(e => e.id === someone.id);
                        this.dataUri = 'someone_profile';
                    });
            },
            addFriend(){
                this.user.friends.push({
                    id: this.someone.id,
                    name: this.someone.name,
                    unreadCount: 0,
                });
                this.submitUserData();
                this.someone.isFriend = true;
                let zz = this.someone;
                this.someone = {};
                this.someone = zz; 
            },
            removeFriend(){
                this.user.friends = this.user.friends.filter(e => e.id !== this.someone.id);
                this.submitUserData();
                this.someone.isFriend = false;
                let zz = this.someone;
                this.someone = {};
                this.someone = zz;
            },
            friendSign(testUser){
                return this.user.friends.some(e => e.id === testUser.id);
            },
            openPrivateChat(testUser) {
                this.someone = testUser;
                this.dataUri = 'private_chat_messages';
            },
            sendMessage(text) {
                this.connection.send(JSON.stringify({
                    from: this.userId,
                    type: 'public',
                    text: text,
                }));
            },
            sendPrivateMessage(text) {
                this.connection.send(JSON.stringify({
                    from: this.userId,
                    to: this.someone.id,
                    type: 'private',
                    text: text,
                }));
            },
            onMessageReceived(data) {
                if (data.type === 'public') {
                    console.log('New public message from:', data.from, ', data:', data);
                    this.messages.push(data);
                    // TODO: DO we need this?
                    if (this.messages.length > 10) {
                        this.messages = this.messages.slice(-10);
                    }
                } else if (data.type === 'private') {
                    let friend = data.from === this.userId ? data.to : data.from;
                    if (!this.private_messages[friend]) {
                        this.private_messages[friend] = [];
                    }
                    console.log('New private message from:', friend, ', data:', data);
                    this.private_messages[friend].push(data);

                    let zz = this.private_messages;
                    this.private_messages = {};
                    this.private_messages = zz;

                    this.user.friends.find(e => e.id == friend).unreadCount++;
                    if (this.dataUri === 'private_chat_messages' && this.someone.id === friend) {
                        this.user.friends.find(e => e.id == friend).unreadCount = 0;
                    }
                } else if (data.type === 'online') {
                    axios.get(`${backendUrl}/users/`)
                        .then(response => { this.userList = response.data.filter(e => e.id !== this.userId);});
                }
            },
            
        },
    };
</script>

<style>
    @import './App.css';
</style>
