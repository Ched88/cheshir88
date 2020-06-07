<template>
    <div id="app">
        <div id="chatForm">
            <form action="" method="post">
                <div class="chat-window">

                    <div class="nav-panel">
                            <ul class="">
                              <li class="item" v-on:click="dataUri = 'global_chat'"><a href="#"><span>Global chat</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_profile'"><a href="#"><span>My profile</span></a></li>
                              <li class="item" v-on:click="dataUri = 'my_friends'"><a href="#"><span>My friends</span></a></li>
                            </ul>
                    </div>
                    <div class="chat">
                        <div v-if="dataUri === 'global_chat'">    
                            <div class="chat-list">
                            </div>
                            <div class="input-area">
                                <div class="input-wrapper"><input type="textarea" value="" placeholder="write something..."></div>
                                <input type="button" value="Send" class="send-btn">
                            </div>
                    
                        </div>

                        <div v-if="dataUri === 'my_profile'">
                           <div class="profile-window">
                            <div class="input-area-profile">
                                <div><span class="span-profile">Status</span></div>
                                    <div class="input-status">
                                        <div class="input-wrapper-profile"><input type="textarea" value="" placeholder="write something..."></div>
                                    </div>
                                        <div><span class="span-profile">Name</span></div>
                                <div class="input-name">
                                    <div class="input-wrapper-profile"><input type="textarea" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">City</span></div>
                                <div class="input-city">
                                        <div class="input-wrapper-profile"><input type="textarea" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Phone number</span></div>
                                <div class="input-phone-number">
                                        <div class="input-wrapper-profile"><input type="tel" value="" placeholder="write something..."></div>
                                </div>
                                        <div><span class="span-profile">Email</span></div>
                                <div class="input-email">
                                        <div class="input-wrapper-profile"><input type="email" value="" placeholder="write something..."></div>
                                </div>
                                <input type="button" value="Submit" class="submit-btn-profile">
                            </div>
                        </div>
                        </div>

                        <div v-if="dataUri === 'my_friends'">
                            <div class="friend-window">
                            <ul class="friends-list"> </ul>
                        </div> 
                        </div>
                    </div>

                    <div class="online-list">
                        <span class="span-online-users">Users now online</span>
                        <ul class="users-list"> user1</ul>
                        <ul class="users-list"> user2</ul>
                    </div>
                    
                </div>
            </form>
        </div>
    </div> 
</template>

<script>
export default {
    data: function () {
      return {
        dataUri: 'global_chat'
        }
    }
};
</script>

<style>
 @import './App.css';
</style>
