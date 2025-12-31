// JavaScript Document
let usedTexts = [];
let usedColors = [];
const MAX_RECENT_ITEMS = 30;

const CONFIG = {
RETURN_DURATION: 300,
CREATE_WINDOW_DELAY: 50,
SPREAD_DELAY: 800,
GATHER_WIDTH: 120,
TIP_WINDOW_HEIGHT: 40,
NUM_WINDOWS: 60,
WINDOW_GAP: 8,
MAX_POS_TRIES: 10
};

// 移动端检测
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 日语提示文本
const TIPS_JA = [
'愛してる','あなたを愛しています','これからも一緒にいてほしい',
'会いたい', '好きだよ','出会えて嬉しい','ハグしよう',
'君は美しい', '君はすごい','君は可愛い','君は優しい',
'君の全てが好き', '君の存在そのものが大切','抱っこ',
'君はかけがえのない存在', '悪戯っ子でも可愛い',
'君は宝物', '君と一緒にいると幸せ','君を大切に思う',
'君は大切な人', '君の優しさは心を温める', '君の強さは尊敬できる',
'君は平凡な日を特別にする', '君の存在は奇跡','君のことを気にかけている',
'君を誇りに思う', '君は深く愛される価値がある',
'一瞬一瞬を大切に', '君は星より輝く','君はいつも大切','君そのものが素敵な贈り物',

'今の気分はどう？', '今日はどうだった？', '今何してるの？','何を考えてる？',
'おはよう', 'こんにちは', 'おやすみ','今日の天気はどう？','何か食べたいものある？',
'今日も一日お疲れ様', 'ぐっすり眠って', '良い夢を見て','話したい？','安らかな眠りを',
'毎晩良い夢がありますように', '早めに休んで', '夜更かししないでね','体調悪いところはない？',
'今日ちゃんと食事した？','お腹を空かせないで','料理は温かいうちに召し上がれ','お腹空いた？何か食べよう',
'気温が下がったら、着込んで','目を閉じてどんな音が聞こえる？',
'今日楽しいことあった？', '勉強は疲れた？','今日の空の色は綺麗？',
'ご飯は食べた？', 'そろそろ休憩しよう','しっかりリラックスして', '最近の睡眠の質はどう？',
'時間通りに食事してる？', 'たまに体を動かして','悪夢は見た？',
'目は疲れた？遠くを見てみて', 'ストレスが溜まったら教えて',
'今日の気分は大丈夫？', '何か私に話したいことある？',
'天気が良かったら散歩に出よう', '水分補給を忘れずに','日光浴しよう',
'無理しすぎないで', '何か手伝えることある？',
'今日も自分を大切に', '最近楽しく過ごしてる？',

'しっかり水を飲んでね', '規則正しい食事を', '体を大切に','眉をほぐしたほうがもっと綺麗',
'規則正しい生活を', '寒いので風邪をひかないよう','健康が一番大事',
'雨で道が滑るからゆっくり歩いて', '雨後に体を冷やさないよう','健康を保つ',
'糖分摂取をコントロール', '健康的な方法でストレス解消', '君の健康を気遣っている',
'野菜と果物をもっと食べて', '適度な運動を忘れずに',
'座りっぱなしだったら立ち上がって動いて', 'ビタミン補給に気をつけて',
'空気が乾燥してるから水を多めに飲んで', 'インフルエンザの季節は予防を',
'長時間画面を見続けないで', '栄養バランスの取れた食事を', '冷たい飲み物を飲みすぎない','愉快な気分を保つ',
'暖かくして風邪をひかないで', '日光浴してビタミンDを補給','空腹でコーヒーを飲まないで',

'努力は報われる', '自分をもっと褒めて', '完璧を求めなくていい','あなたの優しさは、ちゃんと自分自身にも分けてあげて',
'無条件でサポートする', '泣いてもいい', '窓の外を見て', '好きなことをして', 'いつでも連絡して',
'君はもう十分頑張った', '自分に厳しすぎないで', '自分をもっと認めて','自分をもっと肯定して',
'君を信じている', '私たちは君の味方','一時的に方向を見失っても大丈夫',
'君はもう十分よくやっている', 'ゆっくりでいい','君の気持ちや考えはすべて尊重される価値がある',
'失敗も成長の一部', '君の努力は見ている','いつでも君ならできると信じている',
'自分を信じて', '全ての進歩は祝福に値する','失敗を恐れないで', '自分の考えを勇敢に表現して',
'君はどんどん良くなる', '自分に少し時間をあげて','誰にでも光る点がある',
'君はもう素晴らしい','他人と比較しないで', '自分のペースで進もう',
'自分自身を誇りに思って', '君は自分が思うより強い',
'君が歩んできた道は、一歩一歩が意味がある','一時的に方向を見失っても大丈夫',

'自分をもっと大切に', '無理しないで', '自分にプレッシャーをかけすぎないで',
'焦らないで、ゆっくりでいい', '弱さを見せても大丈夫','自分の健康を気遣う','自分の感情に気を配る',
'自分の気持ちを無視しないで', 'あまり「良い子」にならないで', '優しい人は傷つきやすい', '君は絶対に負担ではない',
'君の調子が悪いと心配だ', '何もしなくてもいい','自分の感情を受け入れて',
'君の気持ちは大切だ', '悲しい時は泣いていい','「やりたくない」という気持ちを尊重して',
'いつも強くある必要はない', '自分の感情を大切に','敏感さは欠点ではなく、君の特徴',
'自分を休めることを許して', '君はもう十分頑張っている','時には逃げることも必要',
'君の感情は、どんなものでも正当だ', 'みんなに好かれようとしなくていい','まずは自分を大切に','不快な人間関係から距離を置いて',
'悲しい時は私がいる', '口に出したら楽になるよ','心の傷も時間が癒してくれる',
'自分に優しさをあげて', '君は優しく扱われる価値がある','私はここにいる','自分に「これでいい」と言っていい',
'気分の起伏は正常だ', '自分の心の声によく耳を傾けて','君はまず君自身であり、その後で他の役割なんだ',
'感情を抑え込まないで', '適切に表現することが大切','今日は頑張りたくないなら、頑張らなくていい',
'君はもう十分やっている', '疲れたら少し休もう','四季は巡り、君は絶えず自分自身になっていく',
'全てを完璧にしなくていい','自分に十分な寛容さをあげて','自分の気持ちに従って選択して','自分に優しくして',
'君の価値は、一度の成功や失敗で決まるものじゃない','君はそのままで十分素晴らしい、証明する必要はない','君はいつも幸せである必要はない',
'立ち止まることは、遅れをとることではない','君の独自性は欠点じゃない',

'あなたの平安と健康を願います', '悩みがあなたから離れますように','全てがあなたの望む通りになりますように', '幸運が訪れますように', '毎日小さな驚きがありますように',
'願いが叶いますように', '幸せがいつもあなたと共にありますように','思いがけない温かさに出会えますように',
'あなたの努力が実を結びますように', '心の平安を見つけられますように', '夢が叶いますように', 'あなたの未来が光に満ちますように','素敵なことに出会えますように',
'愛に包まれますように', '良いことが絶えず起こりますように','善良で誠実な人に出会えますように', '素敵な一日になりますように', 'あなたの明日がもっと輝きますように',
'幸運があなたに味方しますように', 'あなたが与えた善意がすべてあなたに返ってきますように','愛と喜びがあなたの日常を満たしますように','私たちが皆、より良い自分に成長できますように',

'安全に気をつけてね', '外出注意','人付き合いで不安を感じたら直感を信じて',
'暗くなる前に早めに帰宅して', '困った時はすぐ助けを求めて', '飲食の安全に注意',
'電気の使用には気をつけて',  '運動前は準備体操を', '天気の変化に注意',
'ネットでの出会いは慎重に', '個人情報はしっかり守って',

'次に会えるのを楽しみにしている',  'あなたが幸せなら、私はとても嬉しい', 
'良い知らせを楽しみにしている', '一緒に素敵な時間を過ごせるのを楽しみに', 'あなたの未来を見られるのを楽しみにしている',
'毎回の出会いを楽しみに', 'お互いにより良くなれるのを楽しみに','あなたの幸せを目撃できるのを楽しみに',

'私たちはお互いを理解し合っている','互いに包容し合い、共に成長する', 'よくコミュニケーションを取って、誤解を減らす',
'お互いの空間を尊重する','困難な時は互いに支え合う','喜びも悲しみも分かち合う', '関係は自然に発展させよう',
'長時間働く時は適度に休憩を', '自分にちょっとご褒美を','小さなギフトを買って自分を労う', '好きなことをしてリラックス','好きなものを楽しんで','音楽はリラックスに役立つ',
'静かな時間を共有しよう','あなたの健康と幸福は私にとって大切です','私はあなたを信じています','小さな歩みでも前進は前進です',
'あなたの内なる平和は貴重です','あなたの目を通して違う世界を見る','あなたの考えを知りたいです','あなたを愛するのは自然なことです','心からあなたが好きです','あなたの感情に正しいも間違いもありません',
'あなたが楽しむことを一緒にしたいです','私への寛容と理解に感謝します','私を信頼してくれてありがとう','あなたの気遣いに感謝します','一緒にいてくれてありがとう','あなたが与えてくれた温もりに感謝します',
'共に過ごす時間は喜びをもたらします','言葉では感謝の気持ちを伝えきれません','それを私と共有してくれてありがとう','気にかけてくれてありがとう','思いやりに感謝します','時間を割いてくれてありがとう',
'あなたらしくいてくれてありがとう','心からあなたを大切に思っています','あなたの全ての感情は正しく、ここで歓迎されます','あなたのそばにいて、何かをしても何もしなくても、それが私の喜びです',
'あなたの信頼は私にとって大きな意味があります','あなたが私の人生にいてくれて嬉しいです','唯一無二の素晴らしいあなたでいてくれてありがとう`愛しています',
];

const TIPS_ID = [
'Aku cinta kamu','Aku cinta padamu','Gue cinta lu','Cintaku padamu tak terbatas',
'Aku rindu kamu', 'Suka sama kamu','Senang bertemu denganmu','peluk',
'Kamu cantik', 'Kamu hebat','Kamu imut','Kamu baik','Aku meyayangimu','Aku mecintaimu',
'Suka setiap sisimu', 'Keberadaanmu sendiri sudah sangat berharga',
'Kamu adalah keberadaan yang unik', 'Bahkan saat nakal juga imut',
'Kamu adalah harta', 'Bersama kamu terasa bahagia','Aku menghargaimu',
'Kamu adalah orang yang penting', 'Kebaikan hatimu menghangatkan hati', 'Ketangguhanmu menginspirasi',
'Kamu membuat hari-hari biasa jadi spesial', 'Keberadaanmu adalah keajaiban','Aku peduli padamu',
'Bangga padamu', 'Kamu layak dicintai dengan dalam',
'Hargai setiap momen', 'Kamu lebih bersinar daripada bintang','Kamu selalu berharga','Dirimu sendiri adalah hadiah indah',

'Bagaimana perasaanmu sekarang?', 'Bagaimana harimu?', 'Sedang apa sekarang?','Sedang memikirkan apa?',
'Selamat pagi', 'Selamat siang', 'Selamat malam','Bagaimana cuaca hari ini?','Ada yang ingin dimakan?',
'Hari ini juga terima kasih atas kerja kerasnya', 'Tidur nyenyak', 'Mimpi indah','Mau mengobrol?','Semoga tidurmu nyenyak',
'Semoga setiap malam kamu bermimpi indah', 'Istirahat lebih awal', 'Jangan begadang','Ada yang tidak nyaman di badan?',
'Hari ini sudah makan dengan baik?','Jangan biarkan diri kelaparan','Makanan dimakan selagi hangat','Lapar? Makan sesuatu yuk',
'Kalau suhu turun, pakai baju lebih banyak','Tutup mata, suara apa yang kamu dengar?',
'Hari ini ada hal menyenangkan?', 'Belajarnya capek?','Warna langit hari ini indah?',
'Sudah makan?', 'Sudah waktunya istirahat','Bersantai sejenak yuk', 'Bagaimana kualitas tidur akhir-akhir ini?',
'Sudah makan tepat waktu?', 'Ingat sering gerakkan badan','Ada mimpi buruk?',
'Matanya capek? Lihat ke kejauhan', 'Kalau stres berat, beri tahu aku',
'Perasaanmu hari ini baik-baik saja?', 'Ada yang ingin dibagikan padaku?',
'Kalau cuaca bagus, jalan-jalan keluar yuk', 'Ingat minum air yang cukup','Berjemurlah',
'Jangan memaksakan diri terlalu keras', 'Ada yang perlu kubantu?',
'Hari ini juga jaga diri baik-baik', 'Akhir-akhir ini kamu bahagia?',

'Minum air yang cukup', 'Makan teratur', 'Sayangi badanmu','Alisnya kalau direnggangkan akan lebih cantik',
'Atur pola tidur yang teratur ya', 'Cuaca dingin, hati-hati jangan sampai flu', 'Kesehatan adalah hal terpenting',
'Hujan, jalannya licin, jalan pelan-pelan ya', 'Hati-hati kedinginan setelah hujan','Jaga kesehatan',
'Kontrol asupan gula', 'Lepaskan stres dengan cara sehat', 'Aku peduli dengan kesehatanmu',
'Perbanyak makan sayur dan buah ya', 'Ingat olahraga yang cukup',
'Duduk lama harus berdiri dan bergerak', 'Perhatikan asupan vitamin',
'Cuaca kering, perbanyak minum air', 'Musim flu, hati-hati',
'Jangan lama-lama menatap layar', 'Makanan harus bergizi seimbang', 'Jangan minum terlalu banyak minuman dingin','Jaga suasana hati yang ceria',
'Hati-hati jangan kedinginan', 'Berjemur untuk tambah vitamin D','Jangan minum kopi saat perut kosong',

'Usaha akan ada hasilnya', 'Puji diri sendiri lebih banyak', 'Tidak perlu mengejar kesempurnaan','Kebaikanmu harus disisakan sebagian untuk dirimu sendiri',
'Mendukungmu tanpa syarat', 'Menangis juga tidak apa-apa', 'Lihat ke luar jendela', 'Lakukan hal yang disuka', 'Bisa hubungi aku kapan saja',
'Kamu sudah berusaha maksimal', 'Jangan terlalu keras pada diri sendiri', 'Akui diri sendiri lebih banyak','Hargai diri sendiri lebih banyak',
'Aku percaya padamu', 'Kami di sisimu','Sementara tidak menemukan arah juga tidak apa-apa',
'Kamu sudah melakukan dengan baik', 'Pelan-pelan saja','Perasaan dan pikiranmu semua layak dihargai',
'Berkeliruan juga bagian dari tumbuh', 'Usahamu kulihat','Aku selalu percaya kamu bisa',
'Percaya pada diri sendiri', 'Setiap kemajuan layak dirayakan','Jangan takut berbuat salah', 'Berani ungkapkan pikiranmu',
'Kamu akan semakin baik', 'Beri diri sendiri waktu','Setiap orang punya keunikan',
'Kamu sudah hebat','Jangan bandingkan dengan orang lain', 'Majulah sesuai ritmemu sendiri',
'Bangga pada dirimu sendiri', 'Kamu lebih kuat dari yang kamu kira',
'Jalan yang kamu lewati, setiap langkah berarti','Sementara tidak menemukan arah juga tidak apa-apa',

'Harus lebih menghargai diri sendiri', 'Jangan memaksakan diri', 'Jangan memberi tekanan terlalu besar pada diri sendiri',
'Jangan buru-buru, pelan-pelan saja', 'Perlihatkan kelemahan juga tidak apa-apa','Perhatikan kesehatan sendiri','Perhatikan perasaan sendiri',
'Jangan abaikan perasaanmu sendiri', 'Jangan terlalu "lugu"', 'Orang baik hati mudah terluka', 'Kamu tidak akan pernah menjadi beban',
'Aku khawatir kalau kondisimu tidak baik', 'Tidak melakukan apa-apa juga tidak apa-apa','Terima emosi diri sendiri',
'Perasaanmu penting', 'Sedih boleh menangis','Hargai perasaan "tidak ingin melakukan" dirimu sendiri',
'Tidak perlu selalu kuat', 'Jaga perasaanmu sendiri','Sensitif bukan kekurangan, itu adalah ciri khasmu',
'Izinkan diri sendiri beristirahat', 'Kamu sudah sangat berusaha','Kadang menghindar juga perlu',
'Perasaanmu, apapun jenisnya, masuk akal', 'Tidak perlu menyenangkan semua orang','Urus diri sendiri dulu','Jauhi hubungan yang membuatmu tidak nyaman',
'Aku di sini saat kamu sedih', 'Diutarakan akan lebih ringan','Luka hati juga butuh waktu untuk sembuh',
'Beri diri sendiri sedikit kelembutan', 'Kamu layak diperlakukan dengan lembut','Aku di sini','Boleh bilang pada diri sendiri "yang seperti ini juga boleh"',
'Perubahan emosi itu normal', 'Dengarkan baik-baik hatimu sendiri','Kamu pertama-tama adalah dirimu sendiri, baru kemudian peran lainnya',
'Jangan tekan emosi', 'Ungkapkan dengan tepat itu penting','Kalau hari ini tidak ingin menyemangati, tidak usah disemangati',
'Kamu sudah melakukan cukup banyak', 'Lelah ya istirahat sebentar','Musim silih berganti, dan kamu terus menjadi dirimu sendiri',
'Tidak perlu semuanya sempurna','Beri diri sendiri toleransi yang cukup','Pilih sesuai keinginan hatimu','Bersikap toleran pada diri sendiri',
'Nilai dirimu, tidak ditentukan oleh sekali sukses atau gagal','Kamu sudah baik seperti ini, tidak perlu membuktikan','Kamu tidak perlu selalu bahagia',
'Berhenti sejenak, tidak berarti tertinggal','Keunikanmu bukanlah kekurangan',

'Semoga kamu sehat dan selamat', 'Semoga semua masalah menjauh darimu','Semoga semua sesuai keinginanmu', 'Semoga keberuntungan datang', 'Semoga setiap hari ada kejutan kecil',
'Semoga harapanmu terkabul', 'Semoga kebahagiaan selalu menyertaimu','Semoga kamu bertemu kehangatan yang tak terduga',
'Semoga usahamu membuahkan hasil', 'Semoga kamu menemukan ketenangan hati', 'Semoga mimpimu menjadi kenyataan', 'Semoga masa depanmu dipenuhi cahaya','Semoga kamu bertemu hal-hal indah',
'Semoga kamu dikelilingi cinta', 'Semoga hal baik terus terjadi','Semoga kamu bertemu orang yang baik dan tulus', 'Semoga harimu indah', 'Semoga esokmu lebih baik',
'Semoga kamu dilimpahi keberuntungan', 'Semoga semua kebaikan yang kamu berikan kembali padamu','Semoga cinta dan sukacita memenuhi keseharianmu','Berharap kita semua bisa tumbuh menjadi diri yang lebih baik',

'Hati-hati ya', 'Keluar rumah hati-hati','Saat bergaul merasa tidak nyaman, percayalah pada naluri',
'Hari sudah gelap, pulang lebih awal', 'Ada kesulitan segera minta tolong', 'Perhatikan keamanan makanan',
'Hati-hati menggunakan listrik',  'Sebelum olahraga lakukan pemanasan', 'Perhatikan perubahan cuaca',
'Berteman online harus hati-hati', 'Lindungi informasi pribadi dengan baik',

'Menantikan pertemuan berikutnya',  'Kalau kamu bahagia, aku akan sangat senang', 
'Menantikan kabar baikmu', 'Menantikan saat-saat indah bersama', 'Menantikan masa depanmu',
'Menantikan setiap pertemuan', 'Menantikan kita menjadi lebih baik bersama','Menantikan menyaksikan kebahagiaanmu',

'Kita saling memahami','Saling memaafkan, tumbuh bersama', 'Banyak komunikasi, kurangi kesalahpahaman',
'Hargai ruang masing-masing','Saling mendukung saat sulit','Berbagi suka dan duka', 'Biarkan hubungan berkembang alami',
'Kerja lama harus istirahat yang cukup', 'Beri diri sendiri hadiah kecil','Beli hadiah kecil untuk menghibur diri', 'Lakukan hal yang disuka untuk relaksasi',
'Nikmati hal yang kamu suka','Musik membantu relaksasi',

'berbagi momen tenang bersama','Kesejahteraan dan kebahagiaanmu penting bagiku','Aku percaya padamu','Bergerak maju selangkah demi selangkah tetap merupakan kemajuan',
'Ketenangan batinmu berharga','Melihat dunia yang berbeda melalui matamu','Aku ingin tahu pandanganmu tentang berbagai hal','Mencintaimu adalah hal yang alami',
'Aku sungguh-sungguh menyukaimu','Emosimu tidak ada yang benar atau salah','Aku ingin melakukan apa yang kamu nikmati bersamamu','Terima kasih atas toleransi dan pengertianmu terhadapku',
'Terima kasih telah mempercayaiku','Terima kasih atas perhatianmu','Terima kasih atas kebersamaanmu','Aku bersyukur atas kehangatan yang telah kamu berikan',
'Waktu yang dihabiskan bersama membawa kebahagiaan','Kata-kata tidak cukup untuk mengungkapkan rasa terima kasihku','Terima kasih telah berbagi itu denganku',
'Aku menghargaimu yang menanyakan kabarku','Terima kasih atas perhatianmu','Terima kasih telah meluangkan waktu untukku','Terima kasih telah menjadi dirimu',
'Aku menghargaimu dengan dalam dan tulus','Semua perasaanmu valid dan disambut di sini','Berada di sampingmu, melakukan apa pun atau tidak melakukan apa pun, adalah kesenanganku',
'Kepercayaanmu padaku sangat berarti','Aku senang memilikimu dalam hidupku','Terima kasih telah menjadi dirimu yang unik dan luar biasa,Aku mencintaimu',
];

// 英语提示文本
const TIPS_EN = [
'I love you','I love you so much','I will always love you',
'I miss you', 'I like you','Nice to meet you','huggy',
'You are beautiful', 'You are amazing','You are cute','You are kind',
'I love everything about you', 'Your existence itself is precious',
'You are irreplaceable', 'Even when you\'re naughty, you\'re still cute',
'You are a treasure', 'I\'m happy when I\'m with you','I cherish you',
'You are an important person', 'Your kindness warms my heart', 'Your strength is admirable',
'You make ordinary days special', 'Your existence is a miracle','I care about you',
'I\'m proud of you', 'You deserve to be deeply loved',
'Treasure every moment', 'You shine brighter than stars','You are always precious','You yourself are a wonderful gift',

'How are you feeling now?', 'How was your day?', 'What are you doing now?','What are you thinking about?',
'Good morning', 'Good afternoon', 'Good night','How\'s the weather today?','Is there anything you want to eat?',
'Thank you for your hard work today', 'Sleep well', 'Have sweet dreams','Do you want to talk?','Have a peaceful sleep',
'I hope you have sweet dreams every night', 'Rest early', 'Don\'t stay up too late','Is anything bothering you?',
'Did you eat well today?','Don\'t let yourself go hungry','Eat while the food is warm','Are you hungry? Let\'s eat something',
'If the temperature drops, wear more clothes','Close your eyes, what sounds do you hear?',
'Did anything fun happen today?', 'Are you tired from studying?','Is the sky color beautiful today?',
'Have you eaten?', 'It\'s time to take a break','Relax properly', 'How has your sleep quality been lately?',
'Are you eating on time?', 'Remember to move your body occasionally','Did you have any nightmares?',
'Are your eyes tired? Look into the distance', 'Tell me if you\'re stressed',
'Are you feeling okay today?', 'Is there anything you want to tell me?',
'If the weather is nice, let\'s go for a walk', 'Remember to stay hydrated','Let\'s get some sunlight',
'Don\'t push yourself too hard', 'Is there anything I can help you with?',
'Take care of yourself today too', 'Have you been happy lately?',

'Drink enough water', 'Eat regular meals', 'Take care of your body','Your eyebrows would look nicer if relaxed',
'Maintain a regular sleep schedule', 'It\'s cold, be careful not to catch a cold','Health is the most important thing',
'The road is slippery when it rains, walk slowly', 'Be careful not to get cold after rain','Stay healthy',
'Control your sugar intake', 'Relieve stress in healthy ways', 'I care about your health',
'Eat more vegetables and fruits', 'Remember to exercise moderately',
'If you\'ve been sitting for long, stand up and move', 'Pay attention to vitamin intake',
'The air is dry, drink more water', 'It\'s flu season, be careful',
'Don\'t stare at screens for too long', 'Eat a balanced diet', 'Don\'t drink too many cold drinks','Keep a cheerful mood',
'Stay warm and don\'t catch a cold', 'Get some sunlight for vitamin D','Don\'t drink coffee on an empty stomach',

'Hard work pays off', 'Praise yourself more', 'You don\'t need to be perfect','Your kindness should also be shared with yourself',
'I support you unconditionally', 'It\'s okay to cry', 'Look out the window', 'Do what you love', 'You can contact me anytime',
'You\'ve tried hard enough', 'Don\'t be too hard on yourself', 'Acknowledge yourself more','Appreciate yourself more',
'I believe in you', 'We are on your side','It\'s okay to temporarily lose your way',
'You\'re doing great', 'Take your time','All your feelings and thoughts are worth respecting',
'Mistakes are part of growth', 'I see your efforts','I always believe you can do it',
'Believe in yourself', 'Every progress is worth celebrating','Don\'t be afraid of failure', 'Express your thoughts bravely',
'You\'re getting better and better', 'Give yourself some time','Everyone has something special about them',
'You\'re already wonderful','Don\'t compare yourself to others', 'Progress at your own pace',
'Be proud of yourself', 'You are stronger than you think',
'Every step you\'ve taken has meaning','It\'s okay to temporarily lose your way',

'Value yourself more', 'Don\'t push yourself', 'Don\'t put too much pressure on yourself',
'Don\'t rush, take your time', 'It\'s okay to show weakness','Take care of your health','Pay attention to your feelings',
'Don\'t ignore your feelings','Kind people get hurt easily', 'You are never a burden',
'I worry when you\'re not feeling well', 'It\'s okay to do nothing','Accept your emotions',
'Your feelings matter', 'It\'s okay to cry when sad','Respect your "don\'t want to do" feelings',
'You don\'t always have to be strong', 'Take care of your feelings','Sensitivity is not a flaw, it\'s your characteristic',
'Allow yourself to rest', 'You\'ve tried hard enough','Sometimes it\'s necessary to avoid',
'Your feelings, whatever they are, are valid', 'You don\'t need to please everyone','Take care of yourself first','Distance yourself from uncomfortable relationships',
'I\'m here when you\'re sad', 'Talking about it will make you feel lighter','Heart wounds also need time to heal',
'Give yourself some gentleness', 'You deserve to be treated gently','I\'m here','It\'s okay to tell yourself "this is fine"',
'Mood swings are normal', 'Listen carefully to your inner voice','You are first and foremost yourself, then other roles',
'Don\'t suppress emotions', 'Expressing appropriately is important','If you don\'t want to cheer up today, you don\'t have to',
'You\'ve done enough', 'If you\'re tired, rest a bit','Seasons change, and you continue to become yourself',
'You don\'t need to be perfect at everything','Give yourself enough tolerance','Choose according to your feelings','Be kind to yourself',
'Your value is not determined by a single success or failure','You\'re wonderful as you are, no need to prove it','You don\'t always have to be happy',
'Stopping for a while doesn\'t mean falling behind','Your uniqueness is not a flaw',

'I wish you peace and health', 'May all worries stay away from you','May everything go as you wish', 'May good luck come', 'May every day have small surprises',
'May your wishes come true', 'May happiness always be with you','May you encounter unexpected warmth',
'May your efforts bear fruit', 'May you find peace of mind', 'May your dreams come true', 'May your future be filled with light','May you encounter wonderful things',
'May you be surrounded by love', 'May good things keep happening','May you meet kind and sincere people', 'Have a wonderful day', 'May your tomorrow be brighter',
'May luck be on your side', 'May all the kindness you give return to you','May love and joy fill your daily life','May we all grow into better versions of ourselves',

'Be careful', 'Be careful when going out','If you feel uncomfortable in social situations, trust your intuition',
'Come home early before it gets dark', 'Ask for help immediately when in trouble', 'Be careful with food safety',
'Be careful with electricity use',  'Warm up before exercise', 'Pay attention to weather changes',
'Be careful with online meetings', 'Protect your personal information well',

'Looking forward to meeting you again',  'If you\'re happy, I\'m very happy', 
'Looking forward to your good news', 'Looking forward to spending wonderful time together', 'Looking forward to seeing your future',
'Looking forward to every meeting', 'Looking forward to becoming better together','Looking forward to witnessing your happiness',

'understand each other,grow together', 'Communicate well to reduce misunderstandings',
'Respect each other\'s space','Support each other in difficult times','Share joys and sorrows', 'Let the relationship develop naturally',

'Take proper breaks when working long hours', 'Give yourself a small reward',
'Buy a small gift to comfort yourself', 'Do what you love to relax','Enjoy what you like','Music helps with relaxation','share a quiet moment together',
'Your well-being and happiness are important to me','I have faith in you','Moving forward in small steps is still progress',
'Your inner peace is precious','Seeing a different world through your eyes','I\'d love to know your perspective on things','Loving you comes naturally',
'I genuinely like you','Your emotions are neither right nor wrong','I\'d love to do what you enjoy with you',
'Thank you for your tolerance and understanding towards me','Thank you for placing your trust in me','Thank you for your care','Thank you for your company',
'I\'m grateful for the warmth you\'ve given me','Time spent together brings joy','Words are not enough to express my gratitude','Thanks for sharing that with me',
'I appreciate you checking in on me','Thanks for your thoughtfulness','Thanks for making time for me','Thank you for being you','I cherish you deeply and sincerely',
'All your feelings are valid and welcome here','Being by your side, doing anything or nothing, is my pleasure','Your faith in me means a lot','I\'m delighted to have you in my life',
'Thank you for being uniquely and wonderfully you,I love you',
];

const BG_COLORS = [
// 粉色系 (原保留)
'#FFC0CB', '#FFB6C1', '#FFCCCC', '#FFDDDD', 
'#FFB5E8', '#FFC9F6', '#FFD9F9', '#FFE5F9', 
'#FFC9E6', '#FFD4E9', '#FFDFEC', '#FFEAF0',

// 橙色系 (原保留)
'#FFD8B1', '#FFE4C4', '#FFEBD2', '#FFF0D6', 
'#FFE5B4', '#FFECCC', '#FFF2D9', '#FFF7E5',
'#FFDDBB', '#FFE8CE', '#FFEFDD', '#FFF4E6', 

// 黄色系 (原保留)
'#FFFACD', '#FFFFE0', '#FFFFCC', '#FFFFE5', 
'#FDFD96', '#FEFD9A', '#FEFE9E', '#FEFEA2', 
'#FFF8DC', '#FFFCE6', '#FFFEE5', '#FFFEF0', 

// 绿色系 (原保留)
'#D4EDDA', '#D1F2D1', '#D8F3DC', '#E8F8F5', 
'#E1FFE1', '#E8FFE8', '#F0FFF0', '#F7FFF7', 
'#C1F7C1', '#D0F8D0', '#DFF9DF', '#EEFAEE', 

// 青色/蓝色系 (原保留)
'#E6F7FF', '#EBF4FF', '#F0F8FF', '#F5FAFF', 
'#D1EEFC', '#DDF2FD', '#E9F6FE', '#F4FAFE', 
'#CCE7FF', '#D9EEFF', '#E6F4FF', '#F3F9FF', 
'#B3E0FF', '#C2E7FF', '#D1EEFF', '#E0F5FF', 
'#A6D9F2', '#B4DFF5', '#C3E6F8', '#D2ECFA',

// 紫色系 (原保留)
'#F0E6FF', '#F5F0FF', '#FAF5FF', '#FDFAFF', '#FFFDFF',
'#E6CCFF', '#ECD9FF', '#F2E6FF', '#F8F2FF', '#FDF9FF',
'#D9BFFF', '#E0CCFF', '#E6D9FF', '#ECE6FF', '#F2F2FF',

/// 柔和的红色系 (饱和度提升10%)
'#FFC2C2', '#FFDDDD', '#FFEEEE', '#FFF5F5', '#FFFAFA',
'#FFADAD', '#FFC6C6', '#FFD9D9', '#FFECEC', '#FFF5F5',
'#FF8C8C', '#FFA8A8', '#FFC2C2', '#FFD6D6', '#FFEBEB',

// 柔和的橙色系 (饱和度提升10%)
'#FFD1A3', '#FFE6CC', '#FFF2E6', '#FFF9F0', '#FFFCF9',
'#FFC288', '#FFD9B3', '#FFE6CC', '#FFF2E6', '#FFF9F2',
'#FFB366', '#FFCC99', '#FFD9B3', '#FFE6CC', '#FFF2E6',

// 柔和的黄色系 (饱和度提升10%)
'#FFFFA8', '#FFFFCC', '#FFFFE6', '#FFFFF5', '#FFFFFA',
'#FFFF8C', '#FFFFB3', '#FFFFCC', '#FFFFE6', '#FFFFF0',
'#FFFF5C', '#FFFF8C', '#FFFFB3', '#FFFFD9', '#FFFFF0',

// 柔和的绿色系 (饱和度提升10%)
'#C2E0C2', '#D9EBD9', '#E6F2E6', '#F2F8F2', '#F9FCF9',
'#A8E0A8', '#C2ECC2', '#D1F2D1', '#E0F8E0', '#F0FDF0',
'#8CCC8C', '#ADD8AD', '#C2DAC2', '#D6EBD6', '#EBF5EB',

// 柔和的蓝色系 (饱和度提升10%)
'#B3D9FF', '#D9EBFF', '#E6F2FF', '#F2F8FF', '#F9FCFF',
'#A3CCFF', '#C2E0FF', '#D1E8FF', '#E0F0FF', '#F0F8FF',
'#8CBFFF', '#ADD6FF', '#C2E0FF', '#D6EBFF', '#EBF5FF',

// 柔和的紫色系 (饱和度提升10%)
'#E0B3FF', '#ECD9FF', '#F2E6FF', '#F8F2FF', '#FCF9FF',
'#D1A3FF', '#E0CCFF', '#E6D9FF', '#EDE6FF', '#F4F2FF',
'#C299FF', '#D6C2FF', '#E0D1FF', '#EBE0FF', '#F5F0FF',


// 鲜艳的红色系 (饱和度+20%)
'#FFB8B8', '#FFD0D0', '#FFE8E8', '#FFF2F2', '#FFF8F8',
'#FF9C9C', '#FFB8B8', '#FFD4D4', '#FFEFEF', '#FFF7F7',
'#FF8080', '#FFA0A0', '#FFC0C0', '#FFE0E0', '#FFF0F0',

// 鲜艳的橙色系 (饱和度+20%)
'#FFC28C', '#FFD9B3', '#FFF0D9', '#FFF7ED', '#FFFCF8',
'#FFB366', '#FFCC99', '#FFE5CC', '#FFF2E6', '#FFF9F2',
'#FFA64D', '#FFBF80', '#FFD9B3', '#FFECCC', '#FFF5E6',

// 鲜艳的黄色系 (饱和度+20%)
'#FFFF99', '#FFFFC2', '#FFFFE0', '#FFFFF0', '#FFFFF9',
'#FFFF80', '#FFFFA3', '#FFFFC6', '#FFFFE0', '#FFFFF0',
'#FFFF4D', '#FFFF80', '#FFFFB3', '#FFFFD9', '#FFFFF0',

// 鲜艳的绿色系 (饱和度+20%)
'#B3E0B3', '#CCEACC', '#E0F0E0', '#F0F8F0', '#F8FCF8',
'#99D699', '#B3E0B3', '#CCEACC', '#E0F5E0', '#F0FAF0',
'#80CC80', '#9FCC9F', '#B3E0B3', '#CCEBCC', '#E0F5E0',

// 鲜艳的蓝色系 (饱和度+20%)
'#B3D9FF', '#CCE5FF', '#E0F0FF', '#F0F8FF', '#F8FCFF',
'#99CCFF', '#B3D9FF', '#CCE6FF', '#E0F0FF', '#F0F8FF',
'#80BFFF', '#9FCCFF', '#B3D9FF', '#CCE5FF', '#E0F0FF',

// 鲜艳的紫色系 (饱和度+20%)
'#D9B3FF', '#E6CCFF', '#F0E0FF', '#F8F0FF', '#FCF8FF',
'#CC99FF', '#D9B3FF', '#E6CCFF', '#F0E0FF', '#F8F2FF',
'#B380FF', '#C299FF', '#D1B3FF', '#E0CCFF', '#F0E6FF',

// 中等饱和度红色系
'#FFB3B3', '#FFBFBF', '#FFCCCC', '#FFD9D9', '#FFE6E6',
'#FF8080', '#FF8C8C', '#FF9999', '#FFA6A6', '#FFB3B3',
'#FF4D4D', '#FF5959', '#FF6666', '#FF7373', '#FF8080',

];

let currentLanguage = 'id';
let TIPS = TIPS_ID;

// 字符宽度和窗口宽度配置
const CHAR_WIDTH_CONFIG = {
'id': isMobile ? 6 : 8,
'ja': isMobile ? 8 : 12,
'en': isMobile ? 6 : 8
};

const BASE_WIDTH_CONFIG = {
'id': isMobile ? -10 : 0,
'ja': isMobile ? 20 : 30,
'en': isMobile ? -10 : 0
};

const MAX_WIDTH_CONFIG = {
'id': isMobile ? 300 : 800,
'ja': isMobile ? 350 : 900,
'en': isMobile ? 300 : 800
};

let windowList = [];
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let isDragging = false;
let dragTarget = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let isInitializing = false;
let buttonsInitialized = false;

// 移动端自适应心形大小
function getHeartScale() {
const minDimension = Math.min(screenWidth, screenHeight);
if (isMobile) {
	if (minDimension < 400) return 8;
	if (minDimension < 600) return 10;
	return 12;
}
return 20;
}

function getHeartPoints(count) {
const points = [];
const scale = getHeartScale();

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

for (let i = 0; i < count; i++) {
	const ratio = i / (count - 1);
	let t;
	
	if (ratio < 0.5) {
		t = Math.PI * Math.pow(2 * ratio, 1.2);
	} else {
		t = Math.PI + Math.PI * Math.pow(2 * (ratio - 0.5), 0.8);
	}
	
	const x = 16 * Math.pow(Math.sin(t), 3);
	const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
	
	minX = Math.min(minX, x);
	maxX = Math.max(maxX, x);
	minY = Math.min(minY, y);
	maxY = Math.max(maxY, y);
}

const heartWidth = (maxX - minX) * scale;
const heartHeight = (maxY - minY) * scale;
const windowWidth = isMobile ? 80 : CONFIG.GATHER_WIDTH;

const availableWidth = screenWidth - windowWidth - 20;
const availableHeight = screenHeight - CONFIG.TIP_WINDOW_HEIGHT - 70;

const centerX = screenWidth / 2 - heartWidth / 8;
const centerY = screenHeight / 2 - heartHeight / 7;

for (let i = 0; i < count; i++) {
	const ratio = i / (count - 1);
	let t;
	
	if (ratio < 0.5) {
		t = Math.PI * Math.pow(2 * ratio, 1.2);
	} else {
		t = Math.PI + Math.PI * Math.pow(2 * (ratio - 0.5), 0.8);
	}
	
	const x = 16 * Math.pow(Math.sin(t), 3);
	const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
	
	const heartX = x * scale;
	const heartY = y * scale;
	
	const pointX = centerX + heartX;
	const pointY = centerY - heartY;
	
	const safeX = Math.max(10, Math.min(pointX, screenWidth - windowWidth - 10));
	const safeY = Math.max(60, Math.min(pointY, screenHeight - CONFIG.TIP_WINDOW_HEIGHT - 10));
	
	points.push({ 
		x: safeX,
		y: safeY
	});
}
return points;
}

function isOverlapping(rect1, rect2, gap) {
return !(
	rect1.x + rect1.width + gap < rect2.x ||
	rect1.x > rect2.x + rect2.width + gap ||
	rect1.y + rect1.height + gap < rect2.y ||
	rect1.y > rect2.y + rect2.height + gap
);
}

function getNonOverlappingPosition(width, height, existingWindows) {
let tries = 0;
let pos;
while (tries < CONFIG.MAX_POS_TRIES) {
	const x = Math.random() * (screenWidth - width - 20) + 10;
	const y = Math.random() * (screenHeight - height - 70) + 60;
	const newRect = { x, y, width, height };
   
	let overlap = false;
	for (const win of existingWindows) {
		if (win.currentX === undefined) continue;
		const existingRect = {
			x: win.currentX,
			y: win.currentY,
			width: win.currentWidth,
			height: CONFIG.TIP_WINDOW_HEIGHT
		};
		if (isOverlapping(newRect, existingRect, CONFIG.WINDOW_GAP)) {
			overlap = true;
			break;
		}
	}
	
	if (!overlap) {
		pos = { x, y };
		break;
	}
	tries++;
}

if (!pos) {
	pos = {
		x: Math.random() * (screenWidth - width - 20) + 10,
		y: Math.random() * (screenHeight - height - 70) + 60
	};
}

return getSafePosition(pos.x, pos.y, width);
}

function calculateAdaptiveWidth(text) {
const baseWidth = BASE_WIDTH_CONFIG[currentLanguage] || 0;
const charWidth = CHAR_WIDTH_CONFIG[currentLanguage] || 8;
const maxWidth = MAX_WIDTH_CONFIG[currentLanguage] || 800;

let calcWidth = baseWidth + text.length * charWidth;

if (text.length > 20) {
	const lengthFactor = Math.max(0.65, 1 - (text.length - 20) * 0.015);
	calcWidth = baseWidth + text.length * charWidth * lengthFactor;
}

if (currentLanguage === 'ja') {
	if (text.length > 20) {
		calcWidth = calcWidth * 1.05;
	} else if (text.length > 10) {
		calcWidth = calcWidth * 1.01;
	}
	calcWidth = Math.max(calcWidth, text.length * (isMobile ? 8 : 10));
}
if (!isMobile) {
calcWidth = calcWidth * 1.4; // 增加40%的宽度以容纳更大的字体
}
const minWidth = isMobile ? 80 : 120;
const actualMaxWidth = Math.min(maxWidth, screenWidth * 0.75);

return Math.max(minWidth, Math.min(calcWidth, actualMaxWidth));
}

function getSafePosition(x, y, width) {
const safeX = Math.max(10, Math.min(x, screenWidth - width - 10));
const safeY = Math.max(60, Math.min(y, screenHeight - CONFIG.TIP_WINDOW_HEIGHT - 10));
return { x: safeX, y: safeY };
}

function initDragEvents(windowEl, windowInfo) {
const startDrag = (clientX, clientY) => {
	isDragging = true;
	dragTarget = windowInfo;
	const rect = windowEl.getBoundingClientRect();
	dragOffsetX = clientX - rect.left;
	dragOffsetY = clientY - rect.top;
	windowEl.style.zIndex = 999;
	windowEl.style.transition = 'none';
};

windowEl.addEventListener('mousedown', (e) => {
	startDrag(e.clientX, e.clientY);
	e.preventDefault();
});

windowEl.addEventListener('touchstart', (e) => {
	if (e.touches.length === 1) {
		const touch = e.touches[0];
		startDrag(touch.clientX, touch.clientY);
		e.preventDefault();
	}
});

const endDrag = () => {
	if (dragTarget) {
		dragTarget.element.style.zIndex = 100;
		dragTarget.element.style.transition = 'all 0.3s ease';
	}
	isDragging = false;
	dragTarget = null;
};

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
}

function createTipWindow(pos) {
const windowEl = document.createElement('div');
windowEl.className = 'tip-window';

const tipText = TIPS[Math.floor(Math.random() * TIPS.length)];
const bgColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];

windowEl.textContent = tipText;
windowEl.style.backgroundColor = bgColor;

const initialWidth = isMobile ? 80 : CONFIG.GATHER_WIDTH;
const safePos = getSafePosition(pos.x, pos.y, initialWidth);

windowEl.style.left = `${safePos.x}px`;
windowEl.style.top = `${safePos.y}px`;
windowEl.style.width = `${initialWidth}px`;

document.body.appendChild(windowEl);

const windowInfo = {
element: windowEl,
originalX: safePos.x,
originalY: safePos.y,
tipText: tipText,
originalWidth: initialWidth,
currentX: safePos.x,
currentY: safePos.y,
currentWidth: initialWidth
};

windowList.push(windowInfo);
initDragEvents(windowEl, windowInfo);
return windowInfo;
}

async function createHeartWindows() {
if (isInitializing) {
	return;
}

isInitializing = true;
try {
	clearAllWindows();
	const heartPoints = getHeartPoints(CONFIG.NUM_WINDOWS);
	
	for (let i = 0; i < heartPoints.length; i++) {
		createTipWindow(heartPoints[i]);
		await new Promise(resolve => setTimeout(resolve, CONFIG.CREATE_WINDOW_DELAY));
	}
	
	setTimeout(spreadWindows, CONFIG.SPREAD_DELAY);
} finally {
	isInitializing = false;
}
}

function spreadWindows() {
const placedWindows = [];

windowList.forEach(windowInfo => {
	const { element, tipText } = windowInfo;
	const adaptiveWidth = calculateAdaptiveWidth(tipText);
	const targetPos = getNonOverlappingPosition(
		adaptiveWidth,
		CONFIG.TIP_WINDOW_HEIGHT,
		placedWindows
	);

	element.style.left = `${targetPos.x}px`;
	element.style.top = `${targetPos.y}px`;
	element.style.width = `${adaptiveWidth}px`;
	
	 if (!isMobile) {
	element.classList.add('spread');
}
	
	windowInfo.currentX = targetPos.x;
	windowInfo.currentY = targetPos.y;
	windowInfo.currentWidth = adaptiveWidth;
	placedWindows.push(windowInfo);
});
}

function returnToHeart() {
windowList.forEach((windowInfo, index) => {
	const { element, originalX, originalY, originalWidth } = windowInfo;
	
	setTimeout(() => {
		element.style.left = `${originalX}px`;
		element.style.top = `${originalY}px`;
		element.style.width = `${originalWidth}px`;
		element.style.zIndex = 100;
		element.classList.remove('spread');
	}, index * 10);
});
}

function clearAllWindows() {
windowList.forEach(windowInfo => {
	if (windowInfo.element && windowInfo.element.parentNode) {
		windowInfo.element.classList.remove('spread');
		windowInfo.element.parentNode.removeChild(windowInfo.element);
	}
});
windowList = [];
isDragging = false;
dragTarget = null;
usedTexts = [];
usedColors = [];
}

// 切换语言函数
function switchLanguage(lang) {
currentLanguage = lang;

switch(lang) {
	case 'id':
		TIPS = TIPS_ID;
		document.getElementById('pageTitle').textContent = 'Aku mencintaimu';
		document.getElementById('returnBtn').textContent = 'Kembali ke Hati';
		document.getElementById('clearBtn').textContent = 'Kosongkan Jendela';
		document.getElementById('langBtn1').textContent = '日本語';
		document.getElementById('langBtn2').textContent = 'English';
		break;
	case 'ja':
		TIPS = TIPS_JA;
		document.getElementById('pageTitle').textContent = '愛しています';
		document.getElementById('returnBtn').textContent = 'ハートに戻る';
		document.getElementById('clearBtn').textContent = 'ウィンドウをクリア';
		document.getElementById('langBtn1').textContent = 'Bahasa Indonesia';
		document.getElementById('langBtn2').textContent = 'English';
		break;
	case 'en':
		TIPS = TIPS_EN;
		document.getElementById('pageTitle').textContent = 'I Love You';
		document.getElementById('returnBtn').textContent = 'Back to Heart';
		document.getElementById('clearBtn').textContent = 'Clear Windows';
		document.getElementById('langBtn1').textContent = 'Bahasa Indonesia';
		document.getElementById('langBtn2').textContent = '日本語';
		break;
}
usedTexts = [];
usedColors = [];
createHeartWindows();
}

function handleMove(clientX, clientY) {
if (!isDragging || !dragTarget) return;

const newX = clientX - dragOffsetX;
const newY = clientY - dragOffsetY;
const safePos = getSafePosition(
	newX,
	newY,
	dragTarget.currentWidth || dragTarget.originalWidth
);

dragTarget.element.style.left = `${safePos.x}px`;
dragTarget.element.style.top = `${safePos.y}px`;
dragTarget.currentX = safePos.x;
dragTarget.currentY = safePos.y;
}

// 初始化页面
function initPage() {
// 显示控制面板
document.getElementById('controlPanel').style.display = 'flex';

// 初始化按钮
initButtons();

// 创建心形窗口
createHeartWindows();
}

// 初始化按钮
function initButtons() {
if (buttonsInitialized) return;
buttonsInitialized = true;

const returnBtn = document.getElementById('returnBtn');
const clearBtn = document.getElementById('clearBtn');
const langBtn1 = document.getElementById('langBtn1');
const langBtn2 = document.getElementById('langBtn2');

returnBtn.addEventListener('click', returnToHeart);
clearBtn.addEventListener('click', clearAllWindows);

// 根据当前语言设置语言按钮
updateLanguageButtons();

// 为语言按钮添加事件
langBtn1.addEventListener('click', () => {
	if (currentLanguage === 'id') {
		switchLanguage('ja');
	} else if (currentLanguage === 'ja') {
		switchLanguage('id');
	} else if (currentLanguage === 'en') {
		switchLanguage('id');
	}
});

langBtn2.addEventListener('click', () => {
	if (currentLanguage === 'id') {
		switchLanguage('en');
	} else if (currentLanguage === 'ja') {
		switchLanguage('en');
	} else if (currentLanguage === 'en') {
		switchLanguage('ja');
	}
});

// 触摸事件支持
returnBtn.addEventListener('touchend', (e) => {
	e.preventDefault();
	returnToHeart();
});

clearBtn.addEventListener('touchend', (e) => {
	e.preventDefault();
	clearAllWindows();
});

langBtn1.addEventListener('touchend', (e) => {
	e.preventDefault();
	langBtn1.click();
});

langBtn2.addEventListener('touchend', (e) => {
	e.preventDefault();
	langBtn2.click();
});
}

// 更新语言按钮文本
function updateLanguageButtons() {
const langBtn1 = document.getElementById('langBtn1');
const langBtn2 = document.getElementById('langBtn2');

if (currentLanguage === 'id') {
	langBtn1.textContent = '日本語';
	langBtn2.textContent = 'English';
} else if (currentLanguage === 'ja') {
	langBtn1.textContent = 'Bahasa Indonesia';
	langBtn2.textContent = 'English';
} else if (currentLanguage === 'en') {
	langBtn1.textContent = 'Bahasa Indonesia';
	langBtn2.textContent = '日本語';
}
}

// 事件监听器
document.addEventListener('mousemove', (e) => {
handleMove(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
if (e.touches.length === 1 && isDragging) {
	const touch = e.touches[0];
	handleMove(touch.clientX, touch.clientY);
	e.preventDefault();
}
}, { passive: false });

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
	clearAllWindows();
}
});

let resizeTimeout;
window.addEventListener('resize', () => {
clearTimeout(resizeTimeout);
resizeTimeout = setTimeout(() => {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	
	windowList.forEach(windowInfo => {
		const { element, currentX, currentY, currentWidth, originalX, originalY, originalWidth } = windowInfo;
		
		if (element) {
			const width = currentWidth || originalWidth;
			const x = currentX !== undefined ? currentX : originalX;
			const y = currentY !== undefined ? currentY : originalY;
			
			const safePos = getSafePosition(x, y, width);
			element.style.left = `${safePos.x}px`;
			element.style.top = `${safePos.y}px`;
			
			windowInfo.currentX = safePos.x;
			windowInfo.currentY = safePos.y;
		}
	});
}, 250);
});

// 页面加载完成
window.addEventListener('load', () => {
// 为语言选择按钮添加事件
document.getElementById('indonesianBtn').addEventListener('click', () => {
	currentLanguage = 'id';
	TIPS = TIPS_ID;
	document.getElementById('languageOverlay').style.display = 'none';
	initPage();
});

document.getElementById('japaneseBtn').addEventListener('click', () => {
	currentLanguage = 'ja';
	TIPS = TIPS_JA;
	document.getElementById('languageOverlay').style.display = 'none';
	initPage();
});

document.getElementById('englishBtn').addEventListener('click', () => {
	currentLanguage = 'en';
	TIPS = TIPS_EN;
	document.getElementById('languageOverlay').style.display = 'none';
	initPage();
});

// 为语言选择按钮添加触摸事件
document.getElementById('indonesianBtn').addEventListener('touchend', (e) => {
	e.preventDefault();
	document.getElementById('indonesianBtn').click();
});

document.getElementById('japaneseBtn').addEventListener('touchend', (e) => {
	e.preventDefault();
	document.getElementById('japaneseBtn').click();
});

document.getElementById('englishBtn').addEventListener('touchend', (e) => {
	e.preventDefault();
	document.getElementById('englishBtn').click();
});
});