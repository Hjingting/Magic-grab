import { card, earphone, fan, glass, key, smallDoll, bigDoll, battery, mouse, eyeshade, funny } from './imgs'

const reward = {
    coinBox: {
        primary: ['5盒币', '6盒币', '7盒币', '8盒币', '9盒币'],
        intermediate: ['10盒币', '11盒币', '12盒币', '13盒币', '14盒币'],
        senior: ['15盒币', '15盒币', '15盒币', '15盒币', '15盒币']
    },
    item: {
        primary: [
            { img: card, name: '50京东卡' },
            { img: glass, name: '马赛克眼镜' },
            { img: earphone, name: '耳机' },
            { img: fan, name: '手持风扇' },
            { img: key, name: '钥匙扣' }
        ],
        senior: [
            { img: smallDoll, name: '孙悟空小公仔' },
            { img: bigDoll, name: '孙悟空大公仔' },
            { img: battery, name: '熊猫充电宝' },
            { img: mouse, name: '电竞键鼠套件' },
            { img: eyeshade, name: '动漫眼罩' },
            { img: funny, name: '滑稽抱枕' }
        ]
    },
    awardUser: [
        { name: '小猪佩奇小猪佩奇小猪佩奇小猪佩奇', item: '8888盒币' },
        { name: '小谷姐姐', item: '熊猫宝宝充电宝' },
        { name: '瓜', item: '超级超级超级手持风扇' }
    ]
}

module.exports = reward