// 함수 자동호출 -- 화살표 함수를 익 익명으로 만든 후 뒤에 ()를 붙혀 바로 호출..! 이렇게 하는 이유는 변수 선언 때문에 스코프 안에서 호출하기!

(()=>{


    let yOffset = 0; //window.pageYoffset을 담을 변수!
    let prevScrollHeight = 0; //현재 스크롤 위치(yoffset)
    let currentScene = 0; //현재 활성화된 씬(눈 앞에 보고 있는)

    const sceneInfo=[
        {
            //0
            type:'sticky',
            heightNum:5,
            scrollHeight: 0, // 브라우저 높이의 X배로 세팅해놓아야함 기계마다 높이가 다르기 때문에!
            objs:{
                container:document.querySelector('#scroll-section-0')
            }
        },
        {
            //1
            type:'normal',
            heightNum:5,
            scrollHeight: 0, // 브라우저 높이의 X배로 세팅해놓아야함 기계마다 높이가 다르기 때문에!
            objs:{
                container:document.querySelector('#scroll-section-1')
            }
            
        },
        {
            //2
            type:'sticky',
            heightNum:5,
            scrollHeight: 0, // 브라우저 높이의 X배로 세팅해놓아야함 기계마다 높이가 다르기 때문에!
            objs:{
                container:document.querySelector('#scroll-section-2')
            }
            
        },
        {
            //3
            type:'sticky',
            heightNum:5,
            scrollHeight: 0, // 브라우저 높이의 X배로 세팅해놓아야함 기계마다 높이가 다르기 때문에!
            objs:{
                container:document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅!
        for (let i = 0 ; i<sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            // sceneInfo에서 미리 선언해준 scrollHeight에 heightNum과 기기별 height를 곱하여! 길이를 계산해준다!
            sceneInfo[i].objs.container.style.height = `${ sceneInfo[i].scrollHeight }px`;
            // 백틱을 이용해서 현재 objs에 가져온 쿼리셀렉터로 height를 설정해준다!
        }

        console.log(sceneInfo);
    }

    function scrollLoop(){ //스크롤 될 때마다 실행~!
        prevScrollHeight = 0;
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        //모든 섹션의 스크롤 높이를 prevScrollHeight 변수 안에 담아주세요! 여기서 포인트는 currentScene을 기준으로 루프를 돌림

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
        //yoffset은 현재 스크롤의 위치이고
        //prevscroll은 처음에 0이고, 씬을 뛰어넘을 때마다 추가됨 currentScene이 scrollHeight를 넘으면 currentScene ++
        //prevScrollHeight(이건 씬 넘어갔는지 안 넘어가는지 확인하기 위함) + scrollHeight는 현재 씬의 스크롤하이트
            currentScene++;
        }
        if(yOffset < prevScrollHeight){
            //예외처리로 currentScene이 0이면 빼지말고 그냥 리턴해서 끝내주세요 라는 뜻
            //다시 스크롤 올렸을 경우~
            if(currentScene === 0 ) return;
            currentScene--;
        }
        // console.log(currentScene);
        // console.log(prevScrollHeight+"asfadsfasf");

    }
    
    window.addEventListener('resize', setLayout);
    // size 변경 될 때마다 실행!
    window.addEventListener('scroll', ()=>{
        //현재 스크롤 위치를 변수에 담음
        yOffset = window.pageYOffset;
        //scroll하면 loop되는 함수
        scrollLoop();
        //
    });

    setLayout();
    // console.log(window.scrollHeight);
})();