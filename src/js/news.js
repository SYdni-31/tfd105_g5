// vue fetch
new Vue({
    el: '#news_app',
    data: {
        news: '',
    },
    methods: {

    },
    mounted() {
        fetch('php/news_select_news.php')
        .then(resp =>resp.json())
        .then(resp => {
            this.news=resp
        })

        // aos
        AOS.init();
    },
})