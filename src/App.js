import { useState, useEffect, useRef } from "react";

// ============================================================
// CONSTANTS
// ============================================================
const AUTH_CREDENTIALS = { id: "FTQuiz@Saroj", password: "TimetoPlay" };
const SESSION_KEY = "ftquiz_session";
const LEADERBOARD_KEY = "ftquiz_leaderboard";

// ============================================================
// QUESTIONS DATABASE
// ============================================================
const easyQuestions = [
  { id:"e001", difficulty:"easy", category:"CLUBS", question:"Which club is known as 'The Red Devils'?", options:["Liverpool","Manchester United","Arsenal","Atletico Madrid"], correctAnswer:1, explanation:"Manchester United have been called The Red Devils since the 1960s, when Matt Busby adopted the nickname from Salford Rugby League Club.", points:10, timeLimit:30 },
  { id:"e002", difficulty:"easy", category:"COMPETITIONS", question:"How many players are on the field per team in a standard football match?", options:["9","10","11","12"], correctAnswer:2, explanation:"Association football is played 11-a-side. Each team has a goalkeeper plus ten outfield players.", points:10, timeLimit:30 },
  { id:"e003", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Who won the 2022 FIFA World Cup?", options:["France","Brazil","Argentina","Germany"], correctAnswer:2, explanation:"Argentina defeated France on penalties in Qatar 2022, giving Lionel Messi his first World Cup title.", points:10, timeLimit:30 },
  { id:"e004", difficulty:"easy", category:"PLAYERS", question:"Cristiano Ronaldo plays for which national team?", options:["Spain","Brazil","Portugal","Italy"], correctAnswer:2, explanation:"Cristiano Ronaldo is Portugal's all-time leading scorer and captain.", points:10, timeLimit:30 },
  { id:"e005", difficulty:"easy", category:"CLUBS", question:"Which stadium is known as 'The Theatre of Dreams'?", options:["Anfield","Camp Nou","Old Trafford","Wembley"], correctAnswer:2, explanation:"Old Trafford has been Manchester United's home since 1910 and earned the 'Theatre of Dreams' nickname from Sir Bobby Charlton.", points:10, timeLimit:30 },
  { id:"e006", difficulty:"easy", category:"COMPETITIONS", question:"What color card results in a player being sent off?", options:["Yellow","Blue","Red","Orange"], correctAnswer:2, explanation:"A red card means immediate dismissal. The card system was introduced by Ken Aston and first used in the 1970 World Cup.", points:10, timeLimit:30 },
  { id:"e007", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country has won the most FIFA World Cups?", options:["Germany","Argentina","Brazil","Italy"], correctAnswer:2, explanation:"Brazil has won the World Cup five times: 1958, 1962, 1970, 1994, and 2002.", points:10, timeLimit:30 },
  { id:"e008", difficulty:"easy", category:"PLAYERS", question:"Lionel Messi spent most of his career at which club?", options:["PSG","Inter Miami","Barcelona","Real Madrid"], correctAnswer:2, explanation:"Messi joined Barcelona's academy aged 13 and played for the club until 2021 — over 17 years.", points:10, timeLimit:30 },
  { id:"e009", difficulty:"easy", category:"COMPETITIONS", question:"What is the premier European club competition formerly called the European Cup?", options:["UEFA Europa League","UEFA Champions League","UEFA Super Cup","FIFA Club World Cup"], correctAnswer:1, explanation:"The European Cup was rebranded as the UEFA Champions League in 1992.", points:10, timeLimit:30 },
  { id:"e010", difficulty:"easy", category:"CLUBS", question:"Which English club is nicknamed 'The Gunners'?", options:["Chelsea","Arsenal","Tottenham","West Ham"], correctAnswer:1, explanation:"Arsenal earned 'The Gunners' nickname from their origin as Dial Square, a munitions workers' team in Woolwich.", points:10, timeLimit:30 },
  { id:"e011", difficulty:"easy", category:"PLAYERS", question:"Which player is known as 'CR7'?", options:["Carlos Rui 7","Cristiano Ronaldo","Carlo Romagnoli","Carlos Rodriguez"], correctAnswer:1, explanation:"CR7 stands for Cristiano Ronaldo, his initials plus his famous squad number 7.", points:10, timeLimit:30 },
  { id:"e012", difficulty:"easy", category:"CLUBS", question:"What color is the home kit of Barcelona?", options:["Red and black","Blue and red","Yellow and black","All white"], correctAnswer:1, explanation:"Barcelona's iconic blue and red (blaugrana) stripes have been their colours since the club's early years.", points:10, timeLimit:30 },
  { id:"e013", difficulty:"easy", category:"COMPETITIONS", question:"How long is a standard football match?", options:["80 minutes","90 minutes","100 minutes","120 minutes"], correctAnswer:1, explanation:"A standard match consists of two 45-minute halves, totalling 90 minutes of regulation time.", points:10, timeLimit:30 },
  { id:"e014", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country does Kylian Mbappé represent?", options:["Belgium","Senegal","France","Morocco"], correctAnswer:2, explanation:"Kylian Mbappé was born in Bondy, France, and has represented the French national team since 2017.", points:10, timeLimit:30 },
  { id:"e015", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Blues' in the English Premier League (most famously)?", options:["Arsenal","Manchester United","Chelsea","Liverpool"], correctAnswer:2, explanation:"Chelsea FC, based in Stamford Bridge, London, are widely known as 'The Blues'.", points:10, timeLimit:30 },
  { id:"e016", difficulty:"easy", category:"RECORDS", question:"Who holds the record for most international goals in men's football history?", options:["Messi","Ronaldo","Pelé","Puskas"], correctAnswer:1, explanation:"Cristiano Ronaldo surpassed 100 international goals and holds the all-time record for men's international football.", points:10, timeLimit:30 },
  { id:"e017", difficulty:"easy", category:"TROPHIES", question:"How many times has Real Madrid won the UEFA Champions League?", options:["10","12","15","18"], correctAnswer:2, explanation:"Real Madrid have won the Champions League / European Cup a record 15 times as of 2024.", points:10, timeLimit:30 },
  { id:"e018", difficulty:"easy", category:"PLAYERS", question:"Which Brazilian legend is simply known by one name — the first 'GOAT' of football?", options:["Ronaldo","Ronaldinho","Pelé","Zico"], correctAnswer:2, explanation:"Edson Arantes do Nascimento, known as Pelé, won three World Cups and is considered one of the greatest footballers ever.", points:10, timeLimit:30 },
  { id:"e019", difficulty:"easy", category:"CLUBS", question:"Which Spanish club is Real Madrid's fiercest rival?", options:["Sevilla","Valencia","Barcelona","Atletico Madrid"], correctAnswer:2, explanation:"El Clásico between Real Madrid and Barcelona is one of the most-watched sporting events in the world.", points:10, timeLimit:30 },
  { id:"e020", difficulty:"easy", category:"COMPETITIONS", question:"In football, what is a 'hat-trick'?", options:["Three yellow cards","Three goals by one player","Three own goals","Three penalties"], correctAnswer:1, explanation:"A hat-trick is when a single player scores three goals in one match.", points:10, timeLimit:30 },
  { id:"e021", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country won Euro 2020 (played in 2021)?", options:["England","France","Italy","Spain"], correctAnswer:2, explanation:"Italy defeated England on penalties in the final at Wembley, winning their second European Championship.", points:10, timeLimit:30 },
  { id:"e022", difficulty:"easy", category:"CLUBS", question:"What city is Manchester City based in?", options:["Leeds","Manchester","Liverpool","Sheffield"], correctAnswer:1, explanation:"Manchester City are based in Manchester, England, playing at the Etihad Stadium.", points:10, timeLimit:30 },
  { id:"e023", difficulty:"easy", category:"PLAYERS", question:"Robert Lewandowski is from which country?", options:["Czech Republic","Slovakia","Poland","Hungary"], correctAnswer:2, explanation:"Robert Lewandowski was born in Warsaw, Poland, and is his country's all-time top scorer.", points:10, timeLimit:30 },
  { id:"e024", difficulty:"easy", category:"TROPHIES", question:"What trophy is awarded to the English league champions?", options:["FA Cup","Carabao Cup","Premier League Trophy","Community Shield"], correctAnswer:2, explanation:"The Premier League Trophy is awarded to the English top-flight champions each season.", points:10, timeLimit:30 },
  { id:"e025", difficulty:"easy", category:"COMPETITIONS", question:"Which competition does the FA Cup belong to?", options:["Scottish football","European football","English football","Welsh football"], correctAnswer:2, explanation:"The FA Cup is the world's oldest football knockout competition, run by the Football Association of England.", points:10, timeLimit:30 },
  { id:"e026", difficulty:"easy", category:"CLUBS", question:"Which Italian club is known as 'The Old Lady' (La Vecchia Signora)?", options:["AC Milan","Inter Milan","Juventus","Napoli"], correctAnswer:2, explanation:"Juventus are nicknamed 'La Vecchia Signora' (The Old Lady) because of their longevity and tradition.", points:10, timeLimit:30 },
  { id:"e027", difficulty:"easy", category:"NATIONAL_TEAMS", question:"How many times has Germany won the FIFA World Cup?", options:["3","4","5","6"], correctAnswer:1, explanation:"Germany (including as West Germany) have won the World Cup four times: 1954, 1974, 1990, and 2014.", points:10, timeLimit:30 },
  { id:"e028", difficulty:"easy", category:"PLAYERS", question:"What position does a goalkeeper play?", options:["Defender","Midfielder","Forward","Last line of defence"], correctAnswer:3, explanation:"The goalkeeper defends the goal and is the only outfield player permitted to use their hands within the penalty area.", points:10, timeLimit:30 },
  { id:"e029", difficulty:"easy", category:"CLUBS", question:"What is the home ground of Liverpool FC?", options:["Old Trafford","Stamford Bridge","Anfield","Elland Road"], correctAnswer:2, explanation:"Liverpool have played at Anfield since 1892. The famous Kop end holds over 20,000 fans.", points:10, timeLimit:30 },
  { id:"e030", difficulty:"easy", category:"COMPETITIONS", question:"What does VAR stand for in football?", options:["Video Assistance Referee","Video Assistant Referee","Virtual Assisted Review","Video Action Replay"], correctAnswer:1, explanation:"VAR stands for Video Assistant Referee — introduced to help referees review key match decisions.", points:10, timeLimit:30 },
  { id:"e031", difficulty:"easy", category:"PLAYERS", question:"Which country does Neymar Jr. represent?", options:["Argentina","Colombia","Brazil","Venezuela"], correctAnswer:2, explanation:"Neymar Jr. represents Brazil, where he was born in Mogi das Cruzes, São Paulo.", points:10, timeLimit:30 },
  { id:"e032", difficulty:"easy", category:"CLUBS", question:"Which club plays at the Santiago Bernabéu Stadium?", options:["Barcelona","Atletico Madrid","Real Madrid","Sevilla"], correctAnswer:2, explanation:"Real Madrid's home is the Santiago Bernabéu, named after their legendary president.", points:10, timeLimit:30 },
  { id:"e033", difficulty:"easy", category:"TROPHIES", question:"The Ballon d'Or is awarded to whom?", options:["Best manager","Best young player","Best goalkeeper","World's best male player"], correctAnswer:3, explanation:"France Football magazine has awarded the Ballon d'Or to the world's best male player since 1956.", points:10, timeLimit:30 },
  { id:"e034", difficulty:"easy", category:"PLAYERS", question:"Harry Kane is the all-time top scorer for which national team?", options:["Wales","Scotland","England","Northern Ireland"], correctAnswer:2, explanation:"Harry Kane surpassed Wayne Rooney's record to become England's all-time top scorer.", points:10, timeLimit:30 },
  { id:"e035", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Reds'?", options:["Arsenal","Nottingham Forest","Liverpool","Sunderland"], correctAnswer:2, explanation:"Liverpool are most famously known as 'The Reds'.", points:10, timeLimit:30 },
  { id:"e036", difficulty:"easy", category:"PLAYERS", question:"Mohamed Salah plays for which Egyptian and club team?", options:["Manchester City and Egypt","Liverpool and Egypt","Arsenal and Egypt","Chelsea and Egypt"], correctAnswer:1, explanation:"Mohamed Salah has played for Liverpool since 2017 and is Egypt's talisman and record scorer.", points:10, timeLimit:30 },
  { id:"e037", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which continent does CONMEBOL represent?", options:["Africa","Europe","South America","Asia"], correctAnswer:2, explanation:"CONMEBOL (Confederación Sudamericana de Fútbol) is the governing body of South American football.", points:10, timeLimit:30 },
  { id:"e038", difficulty:"easy", category:"RECORDS", question:"What is the maximum number of substitutes allowed in a standard professional match?", options:["3","4","5","6"], correctAnswer:2, explanation:"FIFA approved five substitutions per team, a rule introduced permanently after the COVID-19 pandemic.", points:10, timeLimit:30 },
  { id:"e039", difficulty:"easy", category:"CLUBS", question:"Which German club is nicknamed 'Der Rekordmeister' (The Record Champions)?", options:["Borussia Dortmund","Bayer Leverkusen","Bayern Munich","RB Leipzig"], correctAnswer:2, explanation:"Bayern Munich are 'Der Rekordmeister', having won the Bundesliga more times than any other club.", points:10, timeLimit:30 },
  { id:"e040", difficulty:"easy", category:"PLAYERS", question:"Virgil van Dijk is known as an elite player in which position?", options:["Striker","Central midfielder","Central defender","Goalkeeper"], correctAnswer:2, explanation:"Virgil van Dijk is widely regarded as one of the best central defenders of his generation.", points:10, timeLimit:30 },
  { id:"e041", difficulty:"easy", category:"COMPETITIONS", question:"In a penalty shootout, from how many metres is the spot?", options:["9m","11m","12m","16m"], correctAnswer:1, explanation:"The penalty spot is 11 metres (12 yards) from the goal line, as specified by FIFA.", points:10, timeLimit:30 },
  { id:"e042", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country won the Copa América 2021?", options:["Brazil","Uruguay","Chile","Argentina"], correctAnswer:3, explanation:"Argentina won Copa América 2021, defeating Brazil 1-0 in the final — Messi's first major international trophy.", points:10, timeLimit:30 },
  { id:"e043", difficulty:"easy", category:"CLUBS", question:"Paris Saint-Germain is based in which city?", options:["Lyon","Marseille","Paris","Bordeaux"], correctAnswer:2, explanation:"PSG were founded in 1970 and play at the Parc des Princes in Paris.", points:10, timeLimit:30 },
  { id:"e044", difficulty:"easy", category:"PLAYERS", question:"Erling Haaland plays for which country internationally?", options:["Sweden","Denmark","Finland","Norway"], correctAnswer:3, explanation:"Erling Haaland was born in Leeds but raised in Norway and represents the Norwegian national team.", points:10, timeLimit:30 },
  { id:"e045", difficulty:"easy", category:"HISTORY", question:"In which year was FIFA (Fédération Internationale de Football Association) founded?", options:["1900","1904","1910","1920"], correctAnswer:1, explanation:"FIFA was founded in Paris on 21 May 1904 by seven European nations.", points:10, timeLimit:30 },
  { id:"e046", difficulty:"easy", category:"COMPETITIONS", question:"What do the initials UEFA stand for?", options:["United European Football Association","Union of European Football Associations","United European Football Alliance","Universal European Football Authority"], correctAnswer:1, explanation:"UEFA stands for Union of European Football Associations, founded in 1954.", points:10, timeLimit:30 },
  { id:"e047", difficulty:"easy", category:"CLUBS", question:"What is Chelsea FC's home ground?", options:["White Hart Lane","Stamford Bridge","Selhurst Park","Loftus Road"], correctAnswer:1, explanation:"Chelsea have played at Stamford Bridge in Fulham, London since 1905.", points:10, timeLimit:30 },
  { id:"e048", difficulty:"easy", category:"PLAYERS", question:"Which player is famous for the overhead goal in the 2018 Champions League final?", options:["Cristiano Ronaldo","Gareth Bale","Roberto Firmino","Sadio Mané"], correctAnswer:1, explanation:"Gareth Bale's stunning bicycle kick helped Real Madrid beat Liverpool 3-1 in the 2018 UCL final in Kyiv.", points:10, timeLimit:30 },
  { id:"e049", difficulty:"easy", category:"COMPETITIONS", question:"Which tournament is contested by European national teams every four years?", options:["UEFA Nations League","FIFA Confederations Cup","UEFA European Championship","CONCACAF Gold Cup"], correctAnswer:2, explanation:"The UEFA European Championship (Euros) is held every four years.", points:10, timeLimit:30 },
  { id:"e050", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Whose 'Hand of God' goal is legendary in World Cup history?", options:["Pelé","Ronaldo","Diego Maradona","Zidane"], correctAnswer:2, explanation:"Diego Maradona scored the 'Hand of God' goal against England in the 1986 World Cup quarter-final with a handball.", points:10, timeLimit:30 },
  { id:"e051", difficulty:"easy", category:"RECORDS", question:"Who scored the fastest hat-trick in Premier League history?", options:["Sergio Agüero","Mohamed Salah","Sadio Mané","Robin van Persie"], correctAnswer:0, explanation:"Sergio Agüero scored a hat-trick in under 3 minutes against Newcastle in 2015 — the fastest in Premier League history.", points:10, timeLimit:30 },
  { id:"e052", difficulty:"easy", category:"MANAGERS", question:"Who managed Manchester United for 26 years?", options:["Arsène Wenger","Pep Guardiola","José Mourinho","Sir Alex Ferguson"], correctAnswer:3, explanation:"Sir Alex Ferguson managed Manchester United from 1986 to 2013, winning 38 trophies including 13 league titles.", points:10, timeLimit:30 },
  { id:"e053", difficulty:"easy", category:"CLUBS", question:"Which club plays at Camp Nou?", options:["Real Madrid","Atletico Madrid","Barcelona","Valencia"], correctAnswer:2, explanation:"Camp Nou is Barcelona's stadium, the largest in Europe with a capacity exceeding 90,000.", points:10, timeLimit:30 },
  { id:"e054", difficulty:"easy", category:"PLAYERS", question:"Kevin De Bruyne is from which country?", options:["Netherlands","France","Germany","Belgium"], correctAnswer:3, explanation:"Kevin De Bruyne was born in Ghent, Belgium, and is widely regarded as one of the best midfielders in the world.", points:10, timeLimit:30 },
  { id:"e055", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which team won the 2018 FIFA World Cup?", options:["Brazil","Croatia","Belgium","France"], correctAnswer:3, explanation:"France won the 2018 World Cup in Russia, defeating Croatia 4-2 in the final at Luzhniki Stadium.", points:10, timeLimit:30 },
  { id:"e056", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'Spurs'?", options:["West Ham","Tottenham Hotspur","Crystal Palace","Millwall"], correctAnswer:1, explanation:"Tottenham Hotspur are universally known as Spurs.", points:10, timeLimit:30 },
  { id:"e057", difficulty:"easy", category:"PLAYERS", question:"Luka Modrić is from which country?", options:["Serbia","Slovenia","Bosnia","Croatia"], correctAnswer:3, explanation:"Luka Modrić is from Zadar, Croatia, and has captained Croatia in multiple World Cups.", points:10, timeLimit:30 },
  { id:"e058", difficulty:"easy", category:"HISTORY", question:"Football's modern rules were first codified by which organisation?", options:["FIFA","UEFA","The Football Association","IFAB"], correctAnswer:2, explanation:"The Football Association was founded in England in 1863 and first established standardised rules.", points:10, timeLimit:30 },
  { id:"e059", difficulty:"easy", category:"TROPHIES", question:"Which trophy is the domestic cup competition in Germany?", options:["DFB-Pokal","Bundesliga Trophy","German Shield","Coupe de Allemagne"], correctAnswer:0, explanation:"The DFB-Pokal is Germany's premier domestic knockout cup competition.", points:10, timeLimit:30 },
  { id:"e060", difficulty:"easy", category:"PLAYERS", question:"Which striker was nicknamed 'The Phenomenon'?", options:["Thierry Henry","Ronaldo (Brazilian)","Zlatan Ibrahimović","Didier Drogba"], correctAnswer:1, explanation:"The Brazilian Ronaldo (Ronaldo Nazário) was nicknamed 'The Phenomenon'.", points:10, timeLimit:30 },
  { id:"e061", difficulty:"easy", category:"CLUBS", question:"What are the two Milan clubs?", options:["Juventus and Napoli","AC Milan and Inter Milan","AS Roma and Lazio","Torino and Juventus"], correctAnswer:1, explanation:"AC Milan and Inter Milan are the two major football clubs based in Milan, Italy.", points:10, timeLimit:30 },
  { id:"e062", difficulty:"easy", category:"NATIONAL_TEAMS", question:"In which country was the first FIFA World Cup held (1930)?", options:["Brazil","France","Uruguay","Italy"], correctAnswer:2, explanation:"Uruguay hosted and won the inaugural FIFA World Cup in 1930.", points:10, timeLimit:30 },
  { id:"e063", difficulty:"easy", category:"RECORDS", question:"What is the record number of World Cup goals by Just Fontaine in one tournament?", options:["9","11","13","15"], correctAnswer:2, explanation:"Just Fontaine scored 13 goals for France at the 1958 World Cup — a record that still stands today.", points:10, timeLimit:30 },
  { id:"e064", difficulty:"easy", category:"MANAGERS", question:"Which manager is famous for winning the Champions League with multiple clubs?", options:["Arsène Wenger","José Mourinho","Carlo Ancelotti","Louis van Gaal"], correctAnswer:2, explanation:"Carlo Ancelotti has won the Champions League with AC Milan (twice) and Real Madrid.", points:10, timeLimit:30 },
  { id:"e065", difficulty:"easy", category:"CLUBS", question:"Which Italian club is nicknamed 'The Nerazzurri' (Black and Blue)?", options:["AC Milan","Juventus","Inter Milan","Napoli"], correctAnswer:2, explanation:"Inter Milan are called 'I Nerazzurri' because of their black and blue home colours.", points:10, timeLimit:30 },
  { id:"e066", difficulty:"easy", category:"NATIONAL_TEAMS", question:"In which year did England last win the World Cup?", options:["1962","1966","1970","1974"], correctAnswer:1, explanation:"England won the World Cup in 1966, hosted on home soil, defeating West Germany 4-2 in the final at Wembley.", points:10, timeLimit:30 },
  { id:"e067", difficulty:"easy", category:"RECORDS", question:"Who has won the most Ballon d'Or awards?", options:["Cristiano Ronaldo","Ronaldinho","Zinedine Zidane","Lionel Messi"], correctAnswer:3, explanation:"Lionel Messi has won the Ballon d'Or a record 8 times.", points:10, timeLimit:30 },
  { id:"e068", difficulty:"easy", category:"PLAYERS", question:"Didier Drogba is from which country?", options:["Nigeria","Ghana","Senegal","Ivory Coast"], correctAnswer:3, explanation:"Didier Drogba was born in Abidjan, Ivory Coast, and is a legend of African football.", points:10, timeLimit:30 },
  { id:"e069", difficulty:"easy", category:"CLUBS", question:"Atletico Madrid's home ground is called what?", options:["Vicente Calderón","Camp Nou","Wanda Metropolitano","Bernabéu"], correctAnswer:2, explanation:"Atletico Madrid moved to the Wanda Metropolitano stadium in 2017.", points:10, timeLimit:30 },
  { id:"e070", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country was banned from the 2022 World Cup?", options:["China","Russia","North Korea","Iran"], correctAnswer:1, explanation:"Russia was banned from the 2022 World Cup following UEFA's decision after Russia's invasion of Ukraine.", points:10, timeLimit:30 },
  { id:"e071", difficulty:"easy", category:"MANAGERS", question:"Arsène Wenger managed Arsenal for how many years?", options:["15","18","22","25"], correctAnswer:2, explanation:"Arsène Wenger managed Arsenal from 1996 to 2018 — 22 remarkable years.", points:10, timeLimit:30 },
  { id:"e072", difficulty:"easy", category:"TROPHIES", question:"The UEFA Super Cup is contested between winners of which two trophies?", options:["Champions League and Europa League","FA Cup and League Cup","Champions League and FIFA Club World Cup","Europa League and Conference League"], correctAnswer:0, explanation:"The UEFA Super Cup is contested between the Champions League winners and Europa League winners.", points:10, timeLimit:30 },
  { id:"e073", difficulty:"easy", category:"PLAYERS", question:"Paulo Dybala plays international football for which country?", options:["Brazil","Uruguay","Italy","Argentina"], correctAnswer:3, explanation:"Paulo Dybala was born in Córdoba, Argentina, and represents the Argentine national team.", points:10, timeLimit:30 },
  { id:"e074", difficulty:"easy", category:"CLUBS", question:"Borussia Dortmund's home colours are what?", options:["Red and white","Blue and yellow","Black and yellow","Green and black"], correctAnswer:2, explanation:"Borussia Dortmund play in iconic black and yellow.", points:10, timeLimit:30 },
  { id:"e075", difficulty:"easy", category:"HISTORY", question:"The FIFA World Cup is held every how many years?", options:["2","3","4","5"], correctAnswer:2, explanation:"The FIFA World Cup is held every four years.", points:10, timeLimit:30 },
  { id:"e076", difficulty:"easy", category:"PLAYERS", question:"Which player is called 'El Bicho' (The Bug/Pest) by fans?", options:["Messi","Ronaldo","Benzema","Vinicius Jr."], correctAnswer:1, explanation:"Cristiano Ronaldo was nicknamed 'El Bicho' by some Spanish press during his Real Madrid years.", points:10, timeLimit:30 },
  { id:"e077", difficulty:"easy", category:"CLUBS", question:"Celtic and Rangers are bitter rivals from which city?", options:["Edinburgh","Aberdeen","Dundee","Glasgow"], correctAnswer:3, explanation:"The Old Firm Derby between Celtic and Rangers is played in Glasgow.", points:10, timeLimit:30 },
  { id:"e078", difficulty:"easy", category:"TROPHIES", question:"Which trophy is the most prestigious in South American club football?", options:["Copa Sudamericana","Copa Libertadores","Recopa Sudamericana","Copa del Rey"], correctAnswer:1, explanation:"The Copa Libertadores is the premier South American club competition.", points:10, timeLimit:30 },
  { id:"e079", difficulty:"easy", category:"COMPETITIONS", question:"The 'Invincibles' season of 2003/04 was achieved by which team?", options:["Manchester United","Chelsea","Arsenal","Liverpool"], correctAnswer:2, explanation:"Arsenal's 2003/04 squad went the entire Premier League season unbeaten.", points:10, timeLimit:30 },
  { id:"e080", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which team plays in Green and White colours internationally?", options:["Brazil","Argentina","Mexico","Bolivia"], correctAnswer:2, explanation:"Mexico's national team is famous for their green home kit.", points:10, timeLimit:30 },
  { id:"e081", difficulty:"easy", category:"RECORDS", question:"Which club won the first Premier League title in 1992/93?", options:["Blackburn Rovers","Arsenal","Manchester United","Leeds United"], correctAnswer:2, explanation:"Manchester United won the inaugural Premier League title in the 1992/93 season.", points:10, timeLimit:30 },
  { id:"e082", difficulty:"easy", category:"PLAYERS", question:"Which player is nicknamed 'La Pulga' (The Flea)?", options:["Neymar","Messi","Xavi","Iniesta"], correctAnswer:1, explanation:"Lionel Messi is nicknamed 'La Pulga' (The Flea) for his small stature and quick, agile play.", points:10, timeLimit:30 },
  { id:"e083", difficulty:"easy", category:"CLUBS", question:"Which English club is known as 'The Villans'?", options:["Burnley","Aston Villa","Wolverhampton","Nottingham Forest"], correctAnswer:1, explanation:"Aston Villa are nicknamed 'The Villans', playing at Villa Park in Birmingham.", points:10, timeLimit:30 },
  { id:"e084", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which team did Argentina beat to win the 2022 World Cup final?", options:["England","Morocco","Croatia","France"], correctAnswer:3, explanation:"Argentina beat France 4-2 on penalties after a thrilling 3-3 draw in the 2022 World Cup final.", points:10, timeLimit:30 },
  { id:"e085", difficulty:"easy", category:"PLAYERS", question:"Thierry Henry played most of his career at which club?", options:["Chelsea","Arsenal","Manchester City","Tottenham"], correctAnswer:1, explanation:"Thierry Henry played for Arsenal from 1999 to 2007, scoring 228 goals.", points:10, timeLimit:30 },
  { id:"e086", difficulty:"easy", category:"CLUBS", question:"Which club has the nickname 'Barca'?", options:["Bayern Munich","Barcelona","Bayer Leverkusen","Benfica"], correctAnswer:1, explanation:"FC Barcelona are universally abbreviated to 'Barça'.", points:10, timeLimit:30 },
  { id:"e087", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which nation does Sadio Mané represent internationally?", options:["Guinea","Ivory Coast","Senegal","Mali"], correctAnswer:2, explanation:"Sadio Mané is from Bambali, Senegal, and represents the Senegalese national team.", points:10, timeLimit:30 },
  { id:"e088", difficulty:"easy", category:"MANAGERS", question:"Pep Guardiola managed Barcelona before joining which club in 2013?", options:["Real Madrid","Manchester City","Bayern Munich","Juventus"], correctAnswer:2, explanation:"Guardiola joined Bayern Munich in 2013, winning the Bundesliga three times.", points:10, timeLimit:30 },
  { id:"e089", difficulty:"easy", category:"TROPHIES", question:"Which award is given to the player of the tournament at the World Cup?", options:["Golden Boot","Golden Glove","Golden Ball","Silver Ball"], correctAnswer:2, explanation:"The Golden Ball is awarded to the best player of the FIFA World Cup tournament.", points:10, timeLimit:30 },
  { id:"e090", difficulty:"easy", category:"COMPETITIONS", question:"Who oversees football's Laws of the Game globally?", options:["FIFA","UEFA","IFAB","IOC"], correctAnswer:2, explanation:"The International Football Association Board (IFAB) is responsible for the Laws of the Game.", points:10, timeLimit:30 },
  { id:"e091", difficulty:"easy", category:"RECORDS", question:"Who scored the opening goal of the 2022 FIFA World Cup?", options:["Harry Kane","Kylian Mbappé","Enner Valencia","Karim Benzema"], correctAnswer:2, explanation:"Enner Valencia scored twice as Ecuador beat hosts Qatar 2-0 in the opening match.", points:10, timeLimit:30 },
  { id:"e092", difficulty:"easy", category:"CLUBS", question:"Which Portuguese club is nicknamed 'The Eagles'?", options:["Sporting CP","Porto","Benfica","Braga"], correctAnswer:2, explanation:"Benfica are known as 'The Eagles' (As Águias), represented by their mascot Vitória.", points:10, timeLimit:30 },
  { id:"e093", difficulty:"easy", category:"PLAYERS", question:"Zlatan Ibrahimović represented which country internationally?", options:["Croatia","Denmark","Sweden","Norway"], correctAnswer:2, explanation:"Zlatan Ibrahimović was born in Malmö, Sweden, and is Sweden's greatest ever player.", points:10, timeLimit:30 },
  { id:"e094", difficulty:"easy", category:"HISTORY", question:"In which year was the first Football World Cup held?", options:["1924","1926","1928","1930"], correctAnswer:3, explanation:"The first FIFA World Cup was held in Uruguay in 1930.", points:10, timeLimit:30 },
  { id:"e095", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which Asian country is considered the strongest footballing nation in the continent?", options:["China","India","Japan","South Korea"], correctAnswer:2, explanation:"Japan is generally considered Asia's strongest footballing nation.", points:10, timeLimit:30 },
  { id:"e096", difficulty:"easy", category:"MANAGERS", question:"Jürgen Klopp managed Liverpool from which year?", options:["2012","2014","2015","2017"], correctAnswer:2, explanation:"Jürgen Klopp joined Liverpool as manager in October 2015.", points:10, timeLimit:30 },
  { id:"e097", difficulty:"easy", category:"CLUBS", question:"Which city is home to both Arsenal and Tottenham?", options:["Manchester","Birmingham","London","Liverpool"], correctAnswer:2, explanation:"Both Arsenal and Tottenham are based in North London.", points:10, timeLimit:30 },
  { id:"e098", difficulty:"easy", category:"PLAYERS", question:"Which player scored the 'Goal of the Century' at the 1986 World Cup?", options:["Pelé","Zidane","Maradona","Ronaldo"], correctAnswer:2, explanation:"Diego Maradona's slaloming 60-metre solo run against England at the 1986 World Cup was later voted 'Goal of the Century'.", points:10, timeLimit:30 },
  { id:"e099", difficulty:"easy", category:"CLUBS", question:"Porto are based in which country?", options:["Spain","Portugal","Brazil","Angola"], correctAnswer:1, explanation:"FC Porto are based in Porto, Portugal's second-largest city.", points:10, timeLimit:30 },
  { id:"e100", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country won Euro 2016?", options:["France","Belgium","Hungary","Portugal"], correctAnswer:3, explanation:"Portugal defeated the host nation France 1-0 in the Euro 2016 final in Paris.", points:10, timeLimit:30 },
  { id:"e101", difficulty:"easy", category:"TROPHIES", question:"The Golden Boot at the World Cup is awarded to whom?", options:["Best goalkeeper","Best young player","Top goal scorer","Best overall player"], correctAnswer:2, explanation:"The Golden Boot is awarded to the top scorer at the FIFA World Cup.", points:10, timeLimit:30 },
  { id:"e102", difficulty:"easy", category:"PLAYERS", question:"Who is known as 'The Special One'?", options:["Pep Guardiola","Carlo Ancelotti","Arsène Wenger","José Mourinho"], correctAnswer:3, explanation:"José Mourinho famously declared himself 'The Special One' in his inaugural Chelsea press conference in 2004.", points:10, timeLimit:30 },
  { id:"e103", difficulty:"easy", category:"HISTORY", question:"Which country invented the sport of association football?", options:["Scotland","France","Italy","England"], correctAnswer:3, explanation:"Association football was codified in England in 1863 by the Football Association.", points:10, timeLimit:30 },
  { id:"e104", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Citizens'?", options:["Manchester United","Manchester City","Leeds United","Everton"], correctAnswer:1, explanation:"Manchester City are nicknamed 'The Citizens' or 'The Blues'.", points:10, timeLimit:30 },
  { id:"e105", difficulty:"easy", category:"PLAYERS", question:"Son Heung-min is from which country?", options:["Japan","China","South Korea","Thailand"], correctAnswer:2, explanation:"Son Heung-min was born in Chuncheon, South Korea.", points:10, timeLimit:30 },
  { id:"e106", difficulty:"easy", category:"CLUBS", question:"Which Italian club is nicknamed 'The Nerazzurri' — the black and blue?", options:["AC Milan","Juventus","Napoli","Inter Milan"], correctAnswer:3, explanation:"Inter Milan are called 'I Nerazzurri' because of their black and blue striped kit.", points:10, timeLimit:30 },
  { id:"e107", difficulty:"easy", category:"PLAYERS", question:"Which player is nicknamed 'The Egyptian King'?", options:["Mohamed Salah","Emre Can","Roberto Firmino","Jordan Henderson"], correctAnswer:0, explanation:"Mohamed Salah is nicknamed 'The Egyptian King' for his prolific scoring.", points:10, timeLimit:30 },
  { id:"e108", difficulty:"easy", category:"CLUBS", question:"Which French club is based in Marseille?", options:["Paris Saint-Germain","Olympique Lyonnais","AS Monaco","Olympique de Marseille"], correctAnswer:3, explanation:"Olympique de Marseille (OM) are based in Marseille and are the only French club to have won the Champions League (1993).", points:10, timeLimit:30 },
  { id:"e109", difficulty:"easy", category:"HISTORY", question:"The first official international football match was played between which two countries (1872)?", options:["England and Wales","England and Scotland","Scotland and Ireland","France and England"], correctAnswer:1, explanation:"The first official international was played between England and Scotland on 30 November 1872, ending 0-0.", points:10, timeLimit:30 },
  { id:"e110", difficulty:"easy", category:"CLUBS", question:"Which English club is nicknamed 'The Hornets'?", options:["Watford","Brentford","Norwich City","QPR"], correctAnswer:0, explanation:"Watford FC are nicknamed 'The Hornets', playing at Vicarage Road.", points:10, timeLimit:30 },
  { id:"e111", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Karim Benzema represents which national team?", options:["Morocco","Algeria","Tunisia","France"], correctAnswer:3, explanation:"Karim Benzema was born in Lyon, France, and has represented the French national team.", points:10, timeLimit:30 },
  { id:"e112", difficulty:"easy", category:"RECORDS", question:"Which club has won the most English top-flight titles in history?", options:["Liverpool","Arsenal","Chelsea","Manchester United"], correctAnswer:3, explanation:"Manchester United have won 20 English top-flight titles.", points:10, timeLimit:30 },
  { id:"e113", difficulty:"easy", category:"TROPHIES", question:"Which award is given to the best goalkeeper at the World Cup?", options:["Golden Boot","Golden Ball","Golden Glove","Iron Wall Award"], correctAnswer:2, explanation:"The Golden Glove is given to the best goalkeeper at the FIFA World Cup.", points:10, timeLimit:30 },
  { id:"e114", difficulty:"easy", category:"MANAGERS", question:"Which manager won the Premier League in his first season with Manchester City?", options:["Roberto Mancini","Pep Guardiola","Mark Hughes","Kevin Keegan"], correctAnswer:0, explanation:"Roberto Mancini led Manchester City to their first league title in 44 years in 2011/12.", points:10, timeLimit:30 },
  { id:"e115", difficulty:"easy", category:"CLUBS", question:"Which club does Erling Haaland play for as of 2023?", options:["Borussia Dortmund","Red Bull Salzburg","Manchester City","Chelsea"], correctAnswer:2, explanation:"Erling Haaland joined Manchester City in 2022 and broke the Premier League goals record.", points:10, timeLimit:30 },
  { id:"e116", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country won the first Copa América?", options:["Brazil","Argentina","Uruguay","Chile"], correctAnswer:2, explanation:"Uruguay won the inaugural Copa América (then called 'South American Championship') in 1916.", points:10, timeLimit:30 },
  { id:"e117", difficulty:"easy", category:"MANAGERS", question:"Who was the manager of France when they won the 2018 World Cup?", options:["Laurent Blanc","Didier Deschamps","Zinedine Zidane","Raymond Domenech"], correctAnswer:1, explanation:"Didier Deschamps managed France to the 2018 World Cup title.", points:10, timeLimit:30 },
  { id:"e118", difficulty:"easy", category:"PLAYERS", question:"Which position did Ronaldinho famously play?", options:["Striker","Attacking midfielder / playmaker","Right back","Goalkeeper"], correctAnswer:1, explanation:"Ronaldinho was an extraordinary attacking midfielder and playmaker.", points:10, timeLimit:30 },
  { id:"e119", difficulty:"easy", category:"CLUBS", question:"Who are Manchester United's main city rivals?", options:["Liverpool","Chelsea","Arsenal","Manchester City"], correctAnswer:3, explanation:"The Manchester Derby between Manchester United and Manchester City is one of football's great local rivalries.", points:10, timeLimit:30 },
  { id:"e120", difficulty:"easy", category:"HISTORY", question:"Pelé won how many FIFA World Cups?", options:["1","2","3","4"], correctAnswer:2, explanation:"Pelé won three World Cups with Brazil: 1958, 1962, and 1970.", points:10, timeLimit:30 },
  { id:"e121", difficulty:"easy", category:"PLAYERS", question:"Manuel Neuer is considered one of the greatest what?", options:["Strikers","Midfielders","Goalkeepers","Defenders"], correctAnswer:2, explanation:"Manuel Neuer revolutionised the sweeper-keeper role and is widely regarded as the greatest goalkeeper of his generation.", points:10, timeLimit:30 },
  { id:"e122", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country is known as the 'Socceroos' in football?", options:["New Zealand","South Africa","Australia","Canada"], correctAnswer:2, explanation:"Australia's men's national football team is nicknamed the Socceroos.", points:10, timeLimit:30 },
  { id:"e123", difficulty:"easy", category:"CLUBS", question:"Juventus are based in which Italian city?", options:["Rome","Naples","Milan","Turin"], correctAnswer:3, explanation:"Juventus FC, 'The Old Lady', are based in Turin, Piedmont, northern Italy.", points:10, timeLimit:30 },
  { id:"e124", difficulty:"easy", category:"MANAGERS", question:"Which club did Sir Alex Ferguson manage before Manchester United?", options:["Ayr United","Aberdeen","Hearts","Hibernian"], correctAnswer:1, explanation:"Sir Alex Ferguson managed Aberdeen from 1978 to 1986, winning the Cup Winners' Cup in 1983.", points:10, timeLimit:30 },
  { id:"e125", difficulty:"easy", category:"HISTORY", question:"The 'Miracle of Istanbul' refers to which Champions League final?", options:["1999 Manchester United comeback","2005 Liverpool comeback","2012 Chelsea comeback","2019 Liverpool comeback"], correctAnswer:1, explanation:"In the 2005 Champions League final, Liverpool came back from 3-0 down against AC Milan to win on penalties.", points:10, timeLimit:30 },
  { id:"e126", difficulty:"easy", category:"TRANSFERS", question:"Neymar's move from Barcelona to PSG in 2017 cost approximately how much?", options:["£100m","£150m","€222m","£200m"], correctAnswer:2, explanation:"PSG paid €222 million for Neymar in 2017 — by far the most expensive transfer in football history.", points:10, timeLimit:30 },
  { id:"e127", difficulty:"easy", category:"COMPETITIONS", question:"A corner kick is awarded when the ball goes out of play off which player?", options:["Attacking team","Defending team","Either team","The goalkeeper only"], correctAnswer:1, explanation:"A corner kick is given to the attacking team when the ball crosses the goal line after last touching a defending player.", points:10, timeLimit:30 },
  { id:"e128", difficulty:"easy", category:"PLAYERS", question:"Which striker scored 40 Bundesliga goals in the 1971/72 season?", options:["Uwe Seeler","Gerd Müller","Karl-Heinz Rummenigge","Dieter Müller"], correctAnswer:1, explanation:"Gerd Müller scored 40 Bundesliga goals in 1971/72 — a record that stood for 49 years.", points:10, timeLimit:30 },
  { id:"e129", difficulty:"easy", category:"RECORDS", question:"Who holds the record for most La Liga goals in a season (50 goals in 2011/12)?", options:["Cristiano Ronaldo","Lionel Messi","Hugo Sánchez","Telmo Zarra"], correctAnswer:1, explanation:"Lionel Messi scored 50 La Liga goals in the 2011/12 season — the all-time single-season record.", points:10, timeLimit:30 },
  { id:"e130", difficulty:"easy", category:"CLUBS", question:"Feyenoord are based in which Dutch city?", options:["Amsterdam","Utrecht","Rotterdam","The Hague"], correctAnswer:2, explanation:"Feyenoord are based in Rotterdam, making them eternal rivals of Amsterdam-based Ajax.", points:10, timeLimit:30 },
  { id:"e131", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which team won the inaugural MLS Cup in 1996?", options:["LA Galaxy","DC United","New England Revolution","Colorado Rapids"], correctAnswer:1, explanation:"DC United won the first Major League Soccer cup title in 1996.", points:10, timeLimit:30 },
  { id:"e132", difficulty:"easy", category:"CLUBS", question:"Which Dutch club is known as 'Ajax'?", options:["Feyenoord","PSV Eindhoven","AFC Ajax","AZ Alkmaar"], correctAnswer:2, explanation:"AFC Ajax, based in Amsterdam, are Holland's most successful club.", points:10, timeLimit:30 },
  { id:"e133", difficulty:"easy", category:"HISTORY", question:"The 'Munich Air Disaster' of 1958 affected which club?", options:["Juventus","AC Milan","Manchester United","Lazio"], correctAnswer:2, explanation:"The Munich Air Disaster on 6 February 1958 killed 8 Manchester United 'Busby Babes' players.", points:10, timeLimit:30 },
  { id:"e134", difficulty:"easy", category:"TROPHIES", question:"The Premier League season runs from which month to which month?", options:["January to December","March to November","August to May","September to June"], correctAnswer:2, explanation:"The Premier League season typically starts in August and concludes in May.", points:10, timeLimit:30 },
  { id:"e135", difficulty:"easy", category:"MANAGERS", question:"Which manager led Atletico Madrid to La Liga title wins in 2014 and 2021?", options:["Roberto Martínez","Diego Pablo Simeone","Quique Setién","Míchel"], correctAnswer:1, explanation:"Diego Simeone has managed Atletico Madrid since 2011, winning La Liga twice.", points:10, timeLimit:30 },
  { id:"e136", difficulty:"easy", category:"CLUBS", question:"Which club won the treble in 2014/15 under Luis Enrique?", options:["Real Madrid","Juventus","Barcelona","Bayern Munich"], correctAnswer:2, explanation:"Barcelona won La Liga, Copa del Rey, and the Champions League in the 2014/15 season.", points:10, timeLimit:30 },
  { id:"e137", difficulty:"easy", category:"PLAYERS", question:"Which player scored the winning goal in the 2010 World Cup final?", options:["David Villa","Sergio Ramos","Andrés Iniesta","Xavi"], correctAnswer:2, explanation:"Andrés Iniesta scored the only goal in extra time to give Spain a 1-0 victory over Netherlands.", points:10, timeLimit:30 },
  { id:"e138", difficulty:"easy", category:"COMPETITIONS", question:"If a match ends level after 90 minutes in a knockout cup tie, what comes next (before penalties)?", options:["Replay","Golden goal","Extra time","Coin toss"], correctAnswer:2, explanation:"In knockout competitions, a draw after 90 minutes leads to 30 minutes of extra time.", points:10, timeLimit:30 },
  { id:"e139", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Toffees'?", options:["Crystal Palace","Sunderland","Everton","Blackpool"], correctAnswer:2, explanation:"Everton FC are nicknamed 'The Toffees'.", points:10, timeLimit:30 },
  { id:"e140", difficulty:"easy", category:"PLAYERS", question:"Which midfielder was nicknamed 'The Maestro' and captained Spain to their 2010 World Cup glory?", options:["Cesc Fàbregas","David Silva","Xavi Hernández","Andrés Iniesta"], correctAnswer:2, explanation:"Xavi Hernández captained Spain's midfield throughout their 2010 World Cup campaign.", points:10, timeLimit:30 },
  { id:"e141", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Morocco became the first African nation to reach the World Cup semi-final in which year?", options:["1998","2002","2010","2022"], correctAnswer:3, explanation:"Morocco made history at the 2022 World Cup by becoming the first African nation to reach the semi-finals.", points:10, timeLimit:30 },
  { id:"e142", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Whites' (Los Blancos)?", options:["Juventus","Real Madrid","Inter Milan","Ajax"], correctAnswer:1, explanation:"Real Madrid traditionally wear all white, earning them the nickname 'Los Blancos' (The Whites).", points:10, timeLimit:30 },
  { id:"e143", difficulty:"easy", category:"RECORDS", question:"Robert Lewandowski scored how many Bundesliga goals in 2020/21 to break the season record?", options:["36","38","41","43"], correctAnswer:2, explanation:"Robert Lewandowski scored 41 Bundesliga goals in the 2020/21 season, surpassing Gerd Müller's 49-year-old record.", points:10, timeLimit:30 },
  { id:"e144", difficulty:"easy", category:"MANAGERS", question:"Who replaced Klopp as Liverpool manager in 2024?", options:["Roberto De Zerbi","Xabi Alonso","Arne Slot","Michael Beale"], correctAnswer:2, explanation:"Arne Slot was appointed Liverpool manager in 2024 after Jürgen Klopp announced his departure.", points:10, timeLimit:30 },
  { id:"e145", difficulty:"easy", category:"CLUBS", question:"Which club is nicknamed 'The Rossoneri' (Red and Blacks)?", options:["Inter Milan","AC Milan","Bologna","Bari"], correctAnswer:1, explanation:"AC Milan wear red and black stripes, earning them the nickname 'I Rossoneri'.", points:10, timeLimit:30 },
  { id:"e146", difficulty:"easy", category:"PLAYERS", question:"Which player is known as 'The Black Panther' and won the 1966 World Cup Golden Boot?", options:["Garrincha","Eusébio","Pelé","Didí"], correctAnswer:1, explanation:"Eusébio, born in Mozambique and playing for Portugal, was nicknamed 'The Black Panther' and won the 1966 Golden Boot with 9 goals.", points:10, timeLimit:30 },
  { id:"e147", difficulty:"easy", category:"HISTORY", question:"Which country was the first to win back-to-back World Cups (1934, 1938)?", options:["Brazil","Germany","Argentina","Italy"], correctAnswer:3, explanation:"Italy, under Vittorio Pozzo, won consecutive World Cups in 1934 and 1938.", points:10, timeLimit:30 },
  { id:"e148", difficulty:"easy", category:"COMPETITIONS", question:"What does a 'brace' mean in football terminology?", options:["Two assists","Two goals by one player","A tackle","A back-pass"], correctAnswer:1, explanation:"In football, a 'brace' refers to when one player scores exactly two goals in a single game.", points:10, timeLimit:30 },
  { id:"e149", difficulty:"easy", category:"NATIONAL_TEAMS", question:"Which country's national team plays in yellow and green known as the 'Canarinho'?", options:["Argentina","Colombia","Brazil","Ecuador"], correctAnswer:2, explanation:"Brazil's yellow and green kit is one of football's most iconic strips.", points:10, timeLimit:30 },
  { id:"e150", difficulty:"easy", category:"CLUBS", question:"Celtic became the first British club to win the European Cup in which year?", options:["1966","1967","1968","1969"], correctAnswer:1, explanation:"Celtic ('The Lisbon Lions') won the 1967 European Cup, beating Inter Milan 2-1 in Lisbon.", points:10, timeLimit:30 },
];

const mediumQuestions = [
  { id:"m001", difficulty:"medium", category:"RECORDS", question:"Who holds the record for most goals scored in a single World Cup tournament?", options:["Pelé","Just Fontaine","Ronaldo","Gerd Müller"], correctAnswer:1, explanation:"Just Fontaine scored 13 goals for France at the 1958 World Cup — a record that remains unbroken.", points:20, timeLimit:25 },
  { id:"m002", difficulty:"medium", category:"TROPHIES", question:"Which club won the first ever UEFA Champions League (European Cup) in 1956?", options:["AC Milan","Barcelona","Benfica","Real Madrid"], correctAnswer:3, explanation:"Real Madrid won the inaugural European Cup in 1956, defeating Stade de Reims 4-3 in the final.", points:20, timeLimit:25 },
  { id:"m003", difficulty:"medium", category:"TRANSFERS", question:"How much did PSG pay for Neymar in 2017?", options:["£150m","£180m","€200m","€222m"], correctAnswer:3, explanation:"PSG activated Neymar's release clause of €222 million — the most expensive transfer in football history.", points:20, timeLimit:25 },
  { id:"m004", difficulty:"medium", category:"MANAGERS", question:"Which manager has won the most Premier League titles?", options:["Pep Guardiola","Arsène Wenger","José Mourinho","Sir Alex Ferguson"], correctAnswer:3, explanation:"Sir Alex Ferguson won 13 Premier League titles with Manchester United between 1993 and 2013.", points:20, timeLimit:25 },
  { id:"m005", difficulty:"medium", category:"NATIONAL_TEAMS", question:"In what year did Italy last win the FIFA World Cup?", options:["2002","2006","2010","1994"], correctAnswer:1, explanation:"Italy won the 2006 World Cup in Germany, defeating France on penalties in the final.", points:20, timeLimit:25 },
  { id:"m006", difficulty:"medium", category:"RECORDS", question:"What is the highest scoreline ever in a FIFA World Cup match?", options:["9-0","10-1","11-0","17-0"], correctAnswer:1, explanation:"Hungary beat El Salvador 10-1 in the 1982 World Cup — the highest scoring game in World Cup history.", points:20, timeLimit:25 },
  { id:"m007", difficulty:"medium", category:"PLAYERS", question:"Which player has made the most appearances for a single English Premier League club?", options:["Ryan Giggs","James Milner","Frank Lampard","Steven Gerrard"], correctAnswer:0, explanation:"Ryan Giggs made 632 Premier League appearances for Manchester United — the most for a single club.", points:20, timeLimit:25 },
  { id:"m008", difficulty:"medium", category:"CLUBS", question:"Which club won the treble (league, domestic cup, Champions League) in 2014/15?", options:["Real Madrid","Juventus","Barcelona","Bayern Munich"], correctAnswer:2, explanation:"Barcelona won La Liga, Copa del Rey, and the Champions League in the 2014/15 season under Luis Enrique.", points:20, timeLimit:25 },
  { id:"m009", difficulty:"medium", category:"COMPETITIONS", question:"The Champions League group stage was replaced by what format from 2024/25?", options:["Double round-robin with 8 groups","League phase with 36 teams","Four groups of 9 teams","Mini leagues of 6"], correctAnswer:1, explanation:"From the 2024/25 season, the UCL adopted a new league phase with 36 clubs playing 8 matches each.", points:20, timeLimit:25 },
  { id:"m010", difficulty:"medium", category:"TRANSFERS", question:"Which player became the most expensive when he joined Real Madrid in 2013?", options:["Frank Lampard","David Beckham","Gareth Bale","Wayne Rooney"], correctAnswer:2, explanation:"Gareth Bale joined Real Madrid from Spurs for a then-world record fee of around €100 million in 2013.", points:20, timeLimit:25 },
  { id:"m011", difficulty:"medium", category:"HISTORY", question:"In which year did the European Cup (Champions League) begin?", options:["1950","1955","1958","1960"], correctAnswer:1, explanation:"The European Cup began in the 1955/56 season, following a proposal by French sports newspaper L'Equipe.", points:20, timeLimit:25 },
  { id:"m012", difficulty:"medium", category:"PLAYERS", question:"Which midfielder captained Spain to their 2010 World Cup glory?", options:["Cesc Fàbregas","David Silva","Xavi Hernández","Andrés Iniesta"], correctAnswer:2, explanation:"Xavi Hernández captained Spain's midfield throughout their 2010 World Cup campaign and won the Golden Ball.", points:20, timeLimit:25 },
  { id:"m013", difficulty:"medium", category:"TROPHIES", question:"Which team completed the first English Premier League and Champions League double?", options:["Arsenal","Chelsea","Liverpool","Manchester United"], correctAnswer:3, explanation:"Manchester United won the Premier League and Champions League in 1998/99, plus the FA Cup — the famous treble.", points:20, timeLimit:25 },
  { id:"m014", difficulty:"medium", category:"MANAGERS", question:"Which manager was in charge of Leicester City during their miraculous 2015/16 title win?", options:["Craig Shakespeare","Claudio Ranieri","Nigel Pearson","Brendan Rodgers"], correctAnswer:1, explanation:"Claudio Ranieri managed Leicester City to their stunning 5000-1 Premier League title triumph in 2015/16.", points:20, timeLimit:25 },
  { id:"m015", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who scored Argentina's winning penalty in the 2022 World Cup final shootout?", options:["Lautaro Martínez","Gonzalo Montiel","Lionel Messi","Julián Álvarez"], correctAnswer:1, explanation:"Gonzalo Montiel scored the winning penalty in the shootout to seal Argentina's World Cup victory.", points:20, timeLimit:25 },
  { id:"m016", difficulty:"medium", category:"RECORDS", question:"Which goalkeeper has the most Champions League appearances?", options:["Iker Casillas","Manuel Neuer","Gianluigi Buffon","Pepe Reina"], correctAnswer:0, explanation:"Iker Casillas holds the record for most Champions League appearances by a goalkeeper with 177 appearances.", points:20, timeLimit:25 },
  { id:"m017", difficulty:"medium", category:"CLUBS", question:"Which club is nicknamed 'I Rossoneri' (The Red and Blacks)?", options:["Inter Milan","AC Milan","Bologna","Bari"], correctAnswer:1, explanation:"AC Milan wear red and black stripes, earning them the nickname 'I Rossoneri'.", points:20, timeLimit:25 },
  { id:"m018", difficulty:"medium", category:"COMPETITIONS", question:"How many teams competed in the inaugural UEFA Champions League group stage (1992/93)?", options:["8","16","24","32"], correctAnswer:0, explanation:"The first UEFA Champions League in 1992/93 had 8 teams in the final group stage.", points:20, timeLimit:25 },
  { id:"m019", difficulty:"medium", category:"TRANSFERS", question:"From which club did Real Madrid sign Zinedine Zidane in 2001?", options:["AS Monaco","Marseille","Juventus","Bordeaux"], correctAnswer:2, explanation:"Real Madrid paid Juventus a then-world record fee for Zinedine Zidane in 2001.", points:20, timeLimit:25 },
  { id:"m020", difficulty:"medium", category:"PLAYERS", question:"How many Ballon d'Or awards has Messi won?", options:["5","6","7","8"], correctAnswer:3, explanation:"Lionel Messi has won the Ballon d'Or a record 8 times.", points:20, timeLimit:25 },
  { id:"m021", difficulty:"medium", category:"HISTORY", question:"Which country withdrew from the 1950 World Cup over footwear disagreements with FIFA?", options:["India","Bolivia","Egypt","Colombia"], correctAnswer:0, explanation:"India withdrew from the 1950 World Cup partly because FIFA insisted players wore boots rather than playing barefoot.", points:20, timeLimit:25 },
  { id:"m022", difficulty:"medium", category:"CLUBS", question:"Which club holds the record for the longest unbeaten run in English football (49 matches)?", options:["Arsenal","Chelsea","Liverpool","Huddersfield Town"], correctAnswer:0, explanation:"Arsenal's 'Invincibles' set the record with 49 league matches unbeaten across the 2003/04 and 2004/05 seasons.", points:20, timeLimit:25 },
  { id:"m023", difficulty:"medium", category:"MANAGERS", question:"Who coached Brazil to their 1970 World Cup triumph?", options:["Mário Zagallo","João Saldanha","Telê Santana","Vicente Feola"], correctAnswer:0, explanation:"Mário Zagallo coached Brazil's legendary 1970 World Cup-winning squad.", points:20, timeLimit:25 },
  { id:"m024", difficulty:"medium", category:"TROPHIES", question:"How many Champions League titles has Liverpool won?", options:["4","5","6","7"], correctAnswer:2, explanation:"Liverpool have won the European Cup/Champions League six times: 1977, 1978, 1981, 1984, 2005, and 2019.", points:20, timeLimit:25 },
  { id:"m025", difficulty:"medium", category:"RECORDS", question:"Cristiano Ronaldo reached 800 career goals in approximately which year?", options:["2019","2020","2021","2022"], correctAnswer:2, explanation:"Cristiano Ronaldo reached 800 career goals in late 2021, including club and international goals.", points:20, timeLimit:25 },
  { id:"m026", difficulty:"medium", category:"PLAYERS", question:"Which player was the first to score in five different World Cup tournaments?", options:["Cristiano Ronaldo","Pelé","Miroslav Klose","Uwe Seeler"], correctAnswer:0, explanation:"Cristiano Ronaldo became the first player to score in five different World Cup tournaments (2006, 2010, 2014, 2018, 2022).", points:20, timeLimit:25 },
  { id:"m027", difficulty:"medium", category:"COMPETITIONS", question:"The UEFA Conference League was introduced in which season?", options:["2019/20","2020/21","2021/22","2022/23"], correctAnswer:2, explanation:"The UEFA Europa Conference League began in the 2021/22 season as UEFA's third-tier club competition.", points:20, timeLimit:25 },
  { id:"m028", difficulty:"medium", category:"CLUBS", question:"Which club holds the record for most consecutive Bundesliga titles?", options:["Borussia Dortmund","Bayer Leverkusen","Bayern Munich","Borussia Mönchengladbach"], correctAnswer:2, explanation:"Bayern Munich won 11 consecutive Bundesliga titles from 2013 to 2023.", points:20, timeLimit:25 },
  { id:"m029", difficulty:"medium", category:"TRANSFERS", question:"Who was the first player to be transferred for over £1 million in English football?", options:["Kevin Keegan","Trevor Francis","Andy Gray","Garry Birtles"], correctAnswer:1, explanation:"Trevor Francis became the first £1m footballer in England when Brian Clough signed him for Nottingham Forest in 1979.", points:20, timeLimit:25 },
  { id:"m030", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which World Cup final ended 0-0 after 90 minutes and extra time, decided by penalties?", options:["1966 England vs Germany","1994 Brazil vs Italy","1998 France vs Brazil","2010 Spain vs Netherlands"], correctAnswer:1, explanation:"The 1994 World Cup final between Brazil and Italy finished 0-0 after extra time — the first to be decided by penalties.", points:20, timeLimit:25 },
  { id:"m031", difficulty:"medium", category:"HISTORY", question:"The 'Miracle of Bern' refers to which World Cup final?", options:["Germany beating Hungary in 1954","Brazil beating Italy in 1970","England beating West Germany in 1966","Uruguay beating Brazil in 1950"], correctAnswer:0, explanation:"West Germany's 3-2 victory over heavily favoured Hungary in the 1954 World Cup final is known as 'The Miracle of Bern'.", points:20, timeLimit:25 },
  { id:"m032", difficulty:"medium", category:"PLAYERS", question:"Which striker scored 40 Bundesliga goals in 1971/72 before Lewandowski broke the record?", options:["Uwe Seeler","Gerd Müller","Karl-Heinz Rummenigge","Dieter Müller"], correctAnswer:1, explanation:"Gerd Müller scored 40 Bundesliga goals in 1971/72 — a record that stood for 49 years.", points:20, timeLimit:25 },
  { id:"m033", difficulty:"medium", category:"MANAGERS", question:"Who was the only manager to guide England to a World Cup final win?", options:["Bobby Robson","Ron Greenwood","Alf Ramsey","Glenn Hoddle"], correctAnswer:2, explanation:"Alf Ramsey managed England to the 1966 World Cup, which they won on home soil.", points:20, timeLimit:25 },
  { id:"m034", difficulty:"medium", category:"CLUBS", question:"Which club did Jose Mourinho win the Champions League with in 2004?", options:["Chelsea","Real Madrid","Porto","Inter Milan"], correctAnswer:2, explanation:"Mourinho's remarkable Porto side won the Champions League in 2004, beating Monaco 3-0 in the final.", points:20, timeLimit:25 },
  { id:"m035", difficulty:"medium", category:"COMPETITIONS", question:"In which year was VAR first used at a World Cup?", options:["2014","2018","2022","2010"], correctAnswer:1, explanation:"VAR (Video Assistant Referee) was used for the first time at a FIFA World Cup in Russia 2018.", points:20, timeLimit:25 },
  { id:"m036", difficulty:"medium", category:"RECORDS", question:"Who holds the record for most goals scored in UEFA Champions League history?", options:["Lionel Messi","Karim Benzema","Raúl","Cristiano Ronaldo"], correctAnswer:3, explanation:"Cristiano Ronaldo has scored over 140 Champions League goals — the most in the competition's history.", points:20, timeLimit:25 },
  { id:"m037", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which country won the most Africa Cup of Nations titles?", options:["Ghana","Nigeria","Egypt","Cameroon"], correctAnswer:2, explanation:"Egypt have won the Africa Cup of Nations a record 7 times.", points:20, timeLimit:25 },
  { id:"m038", difficulty:"medium", category:"TRANSFERS", question:"Kylian Mbappé moved to Real Madrid from PSG for how much in 2024?", options:["€100m","€150m","Free transfer","€80m"], correctAnswer:2, explanation:"Kylian Mbappé joined Real Madrid in 2024 as a free transfer when his PSG contract expired.", points:20, timeLimit:25 },
  { id:"m039", difficulty:"medium", category:"PLAYERS", question:"Who scored the winning goal in the 2010 World Cup final?", options:["David Villa","Sergio Ramos","Andrés Iniesta","Xavi"], correctAnswer:2, explanation:"Andrés Iniesta scored the only goal in extra time to give Spain a 1-0 victory over Netherlands.", points:20, timeLimit:25 },
  { id:"m040", difficulty:"medium", category:"HISTORY", question:"The Hillsborough Disaster of 1989 occurred during a match between which two clubs?", options:["Liverpool and Everton","Liverpool and Nottingham Forest","Sheffield Wednesday and Arsenal","Liverpool and Arsenal"], correctAnswer:1, explanation:"The Hillsborough Disaster occurred on 15 April 1989 during the FA Cup semi-final between Liverpool and Nottingham Forest.", points:20, timeLimit:25 },
  { id:"m041", difficulty:"medium", category:"PLAYERS", question:"Which player has the most assists in Premier League history?", options:["Frank Lampard","Ryan Giggs","Cesc Fàbregas","Wayne Rooney"], correctAnswer:1, explanation:"Ryan Giggs holds the Premier League record with 162 assists across his Manchester United career.", points:20, timeLimit:25 },
  { id:"m042", difficulty:"medium", category:"MANAGERS", question:"Mauricio Pochettino led Tottenham to which milestone achievement?", options:["First Premier League title","First FA Cup","First Champions League final","First Europa League final"], correctAnswer:2, explanation:"Mauricio Pochettino led Tottenham Hotspur to their first UEFA Champions League final in 2019.", points:20, timeLimit:25 },
  { id:"m043", difficulty:"medium", category:"COMPETITIONS", question:"Which competition did Internazionale win in the 2009/10 treble season?", options:["Serie A, Coppa Italia, Champions League","Serie A, Champions League, FIFA Club World Cup","Serie A, Coppa Italia, UEFA Cup","Coppa Italia, Champions League, Super Cup"], correctAnswer:0, explanation:"Under José Mourinho, Inter won Serie A, Coppa Italia, and the Champions League in 2009/10.", points:20, timeLimit:25 },
  { id:"m044", difficulty:"medium", category:"RECORDS", question:"What is the highest number of Premier League goals scored in one season by one player?", options:["29","32","34","36"], correctAnswer:3, explanation:"Erling Haaland set a new Premier League record by scoring 36 goals in the 2022/23 season.", points:20, timeLimit:25 },
  { id:"m045", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who are the current World Cup holders as of 2024?", options:["France","Brazil","Argentina","England"], correctAnswer:2, explanation:"Argentina are the reigning World Cup holders, having won the 2022 tournament in Qatar.", points:20, timeLimit:25 },
  { id:"m046", difficulty:"medium", category:"TROPHIES", question:"Which club won the first ever Europa League (2009/10)?", options:["Benfica","Atletico Madrid","Fulham","Hamburger SV"], correctAnswer:1, explanation:"Atletico Madrid won the inaugural UEFA Europa League in 2009/10, defeating Fulham in the final.", points:20, timeLimit:25 },
  { id:"m047", difficulty:"medium", category:"TRANSFERS", question:"For how much did Chelsea sign Enzo Fernández in January 2023?", options:["£85m","£95m","£105m","€121m"], correctAnswer:3, explanation:"Chelsea broke the British transfer record by signing Enzo Fernández for €121 million in January 2023.", points:20, timeLimit:25 },
  { id:"m048", difficulty:"medium", category:"CLUBS", question:"Which club from the Netherlands won the Champions League in 1995?", options:["PSV Eindhoven","Ajax","Feyenoord","AZ Alkmaar"], correctAnswer:1, explanation:"Ajax won the Champions League in 1994/95, beating AC Milan 1-0 in the final.", points:20, timeLimit:25 },
  { id:"m049", difficulty:"medium", category:"HISTORY", question:"Which World Cup final ended with a 0-0 draw that went to penalties for the first time?", options:["1966","1974","1994","2006"], correctAnswer:2, explanation:"The 1994 World Cup final between Brazil and Italy finished 0-0 and was the first World Cup final decided on penalties.", points:20, timeLimit:25 },
  { id:"m050", difficulty:"medium", category:"PLAYERS", question:"Who scored a legendary left-foot volley in the 2002 Champions League final?", options:["Ronaldo","Roberto Carlos","Zinedine Zidane","Raúl"], correctAnswer:2, explanation:"Zinedine Zidane's left-foot volley in the 2002 Champions League final against Bayer Leverkusen is one of the greatest goals ever.", points:20, timeLimit:25 },
  { id:"m051", difficulty:"medium", category:"MANAGERS", question:"Who was the first foreign manager to win the FA Cup?", options:["Ruud Gullit","José Mourinho","Arsène Wenger","Gérard Houllier"], correctAnswer:0, explanation:"Ruud Gullit became the first foreign manager to win a major English trophy when he won the FA Cup with Chelsea in 1997.", points:20, timeLimit:25 },
  { id:"m052", difficulty:"medium", category:"NATIONAL_TEAMS", question:"How many goals did Eusébio score at the 1966 World Cup?", options:["6","7","8","9"], correctAnswer:3, explanation:"Eusébio scored 9 goals at the 1966 World Cup in England, winning the Golden Boot.", points:20, timeLimit:25 },
  { id:"m053", difficulty:"medium", category:"TRANSFERS", question:"For how much did Manchester City sign Jack Grealish in 2021?", options:["£75m","£90m","£100m","£120m"], correctAnswer:2, explanation:"Manchester City paid Aston Villa £100 million for Jack Grealish in 2021 — a British transfer record at the time.", points:20, timeLimit:25 },
  { id:"m054", difficulty:"medium", category:"CLUBS", question:"Which club has the nickname 'I Nerazzurri' (The Black and Blues)?", options:["Juventus","AC Milan","Inter Milan","Napoli"], correctAnswer:2, explanation:"Inter Milan are nicknamed 'I Nerazzurri' because of their black and blue striped kit.", points:20, timeLimit:25 },
  { id:"m055", difficulty:"medium", category:"HISTORY", question:"The 'Munich Air Disaster' of 1958 affected which English club's players?", options:["Juventus","Arsenal","Manchester United","Chelsea"], correctAnswer:2, explanation:"The Munich Air Disaster on 6 February 1958 killed 8 Manchester United 'Busby Babes' players.", points:20, timeLimit:25 },
  { id:"m056", difficulty:"medium", category:"COMPETITIONS", question:"Who was the top scorer in the 2023/24 Premier League season?", options:["Mohamed Salah","Erling Haaland","Cole Palmer","Ollie Watkins"], correctAnswer:1, explanation:"Erling Haaland won the Golden Boot in 2023/24 with 27 Premier League goals.", points:20, timeLimit:25 },
  { id:"m057", difficulty:"medium", category:"RECORDS", question:"What is the highest transfer fee ever paid for a goalkeeper?", options:["Kepa Arrizabalaga (£71m)","Ederson (£35m)","Gianluigi Donnarumma (£57m)","Alisson Becker (£65m)"], correctAnswer:0, explanation:"Kepa Arrizabalaga joined Chelsea from Athletic Bilbao in 2018 for £71 million — the world record for a goalkeeper.", points:20, timeLimit:25 },
  { id:"m058", difficulty:"medium", category:"PLAYERS", question:"Which player scored a hat-trick in the 1966 World Cup final?", options:["Geoff Hurst","Bobby Charlton","Gordon Banks","Roger Hunt"], correctAnswer:0, explanation:"Geoff Hurst scored a hat-trick in the 1966 World Cup final — the only player ever to do so.", points:20, timeLimit:25 },
  { id:"m059", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which country topped their World Cup group with a famous win and was beaten by Poland?", options:["Mexico","Argentina","England","France"], correctAnswer:1, explanation:"Argentina won their 2022 World Cup group after the dramatic opening loss to Saudi Arabia.", points:20, timeLimit:25 },
  { id:"m060", difficulty:"medium", category:"TRANSFERS", question:"Which club sold Cristiano Ronaldo to Juventus for £99 million in 2018?", options:["Manchester United","Sporting CP","Real Madrid","PSG"], correctAnswer:2, explanation:"Real Madrid sold Cristiano Ronaldo to Juventus for £99 million in the summer of 2018.", points:20, timeLimit:25 },
  { id:"m061", difficulty:"medium", category:"MANAGERS", question:"Which manager led Atletico Madrid to La Liga titles in 2014 and 2021?", options:["Roberto Martínez","Diego Pablo Simeone","Quique Setién","Míchel"], correctAnswer:1, explanation:"Diego Simeone (El Cholo) has managed Atletico Madrid since 2011, winning La Liga twice.", points:20, timeLimit:25 },
  { id:"m062", difficulty:"medium", category:"CLUBS", question:"Bayer Leverkusen are nicknamed what?", options:["Die Roten","Neverkusen","Die Werkself","Die Adler"], correctAnswer:2, explanation:"Bayer Leverkusen are nicknamed 'Die Werkself' due to their origins as a pharmaceutical company team.", points:20, timeLimit:25 },
  { id:"m063", difficulty:"medium", category:"HISTORY", question:"In which years did Nottingham Forest win back-to-back European Cups under Brian Clough?", options:["1977-78 and 1978-79","1978-79 and 1979-80","1979-80 and 1980-81","1976-77 and 1977-78"], correctAnswer:1, explanation:"Nottingham Forest won the European Cup in 1979 and 1980 under Brian Clough.", points:20, timeLimit:25 },
  { id:"m064", difficulty:"medium", category:"COMPETITIONS", question:"What year was the Premier League founded?", options:["1988","1990","1992","1995"], correctAnswer:2, explanation:"The Premier League was founded in 1992 when the top clubs broke away from the Football League.", points:20, timeLimit:25 },
  { id:"m065", difficulty:"medium", category:"RECORDS", question:"What's the record for the fastest red card in football history (professional)?", options:["2 seconds","5 seconds","10 seconds","13 seconds"], correctAnswer:0, explanation:"Giuseppe Lorenzo of Bologna received a red card after just 2 seconds of a Serie A match in 1990.", points:20, timeLimit:25 },
  { id:"m066", difficulty:"medium", category:"PLAYERS", question:"George Best played primarily for which club?", options:["Glentoran","Linfield","Derry City","Manchester United"], correctAnswer:3, explanation:"George Best was from Belfast and played his club career primarily at Manchester United, where he won the Ballon d'Or in 1968.", points:20, timeLimit:25 },
  { id:"m067", difficulty:"medium", category:"NATIONAL_TEAMS", question:"In which World Cup did Zinedine Zidane score twice in the final?", options:["1994","1998","2002","2006"], correctAnswer:1, explanation:"Zidane scored twice with headers in the 1998 World Cup final in Paris, as France beat Brazil 3-0.", points:20, timeLimit:25 },
  { id:"m068", difficulty:"medium", category:"TRANSFERS", question:"Paul Pogba rejoined Manchester United from Juventus in 2016 for how much?", options:["£85m","£89m","£99m","£105m"], correctAnswer:1, explanation:"Paul Pogba rejoined Manchester United for a then world-record £89 million in the summer of 2016.", points:20, timeLimit:25 },
  { id:"m069", difficulty:"medium", category:"CLUBS", question:"Celtic became the first British club to win the European Cup in which year?", options:["1966","1967","1968","1969"], correctAnswer:1, explanation:"Celtic ('The Lisbon Lions') won the 1967 European Cup, beating Inter Milan 2-1 in Lisbon.", points:20, timeLimit:25 },
  { id:"m070", difficulty:"medium", category:"HISTORY", question:"The Bosman Ruling of 1995 allowed players what right?", options:["Sign any player regardless of fee","Move freely when contract expires","Women to play in men's leagues","Goal-line technology"], correctAnswer:1, explanation:"The Bosman Ruling allowed EU players to move freely between clubs in EU countries when their contract expired.", points:20, timeLimit:25 },
  { id:"m071", difficulty:"medium", category:"MANAGERS", question:"Which club did Pep Guardiola join after leaving Barcelona in 2013?", options:["Manchester City","Real Madrid","Bayern Munich","PSG"], correctAnswer:2, explanation:"Pep Guardiola joined Bayern Munich in 2013 for three trophy-laden seasons.", points:20, timeLimit:25 },
  { id:"m072", difficulty:"medium", category:"RECORDS", question:"Who holds the Serie A all-time goals record?", options:["Roberto Baggio","Francesco Totti","Cristiano Ronaldo","Silvio Piola"], correctAnswer:3, explanation:"Silvio Piola holds the all-time Serie A scoring record with 274 goals.", points:20, timeLimit:25 },
  { id:"m073", difficulty:"medium", category:"PLAYERS", question:"Steven Gerrard spent his entire career at which club?", options:["Everton","West Ham","Liverpool","Middlesbrough"], correctAnswer:2, explanation:"Steven Gerrard made 710 appearances for Liverpool, becoming the greatest captain in their history.", points:20, timeLimit:25 },
  { id:"m074", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Morocco became the first African nation to reach the World Cup semi-final in which year?", options:["1998","2002","2010","2022"], correctAnswer:3, explanation:"Morocco made history at the 2022 World Cup in Qatar, becoming the first African and Arab nation to reach the semi-finals.", points:20, timeLimit:25 },
  { id:"m075", difficulty:"medium", category:"TROPHIES", question:"Which club won the UEFA Cup Winners' Cup the most times?", options:["Barcelona","Chelsea","Arsenal","Lazio"], correctAnswer:0, explanation:"Barcelona won the now-defunct UEFA Cup Winners' Cup a record four times.", points:20, timeLimit:25 },
  { id:"m076", difficulty:"medium", category:"CLUBS", question:"Flamengo are a famous club from which Brazilian city?", options:["São Paulo","Porto Alegre","Rio de Janeiro","Salvador"], correctAnswer:2, explanation:"Clube de Regatas do Flamengo are based in Rio de Janeiro and are Brazil's most-followed football club.", points:20, timeLimit:25 },
  { id:"m077", difficulty:"medium", category:"TRANSFERS", question:"Which club paid a British record fee for Virgil van Dijk from Southampton in 2018?", options:["Manchester City","Chelsea","Liverpool","Arsenal"], correctAnswer:2, explanation:"Liverpool paid Southampton £75 million for Virgil van Dijk in January 2018.", points:20, timeLimit:25 },
  { id:"m078", difficulty:"medium", category:"HISTORY", question:"Who was the first club to win the Champions League without losing a match?", options:["AC Milan 1994","Bayern Munich 2020","Real Madrid 2018","Liverpool 2005"], correctAnswer:1, explanation:"Bayern Munich went the entire 2019/20 Champions League without losing a single match.", points:20, timeLimit:25 },
  { id:"m079", difficulty:"medium", category:"PLAYERS", question:"Paolo Maldini spent his entire career at which club?", options:["Inter Milan","Juventus","AC Milan","Napoli"], correctAnswer:2, explanation:"Paolo Maldini is an AC Milan legend, spending his entire 25-year career at the club.", points:20, timeLimit:25 },
  { id:"m080", difficulty:"medium", category:"COMPETITIONS", question:"The Women's World Cup began in which year?", options:["1988","1991","1994","1999"], correctAnswer:1, explanation:"The inaugural FIFA Women's World Cup was held in China in 1991.", points:20, timeLimit:25 },
  { id:"m081", difficulty:"medium", category:"RECORDS", question:"Which club has scored the most goals in a single Champions League season?", options:["Real Madrid","Bayern Munich","Barcelona","Manchester City"], correctAnswer:1, explanation:"Bayern Munich scored 42 goals in their 2019/20 Champions League campaign — a single-season record.", points:20, timeLimit:25 },
  { id:"m082", difficulty:"medium", category:"MANAGERS", question:"Who replaced Klopp as Liverpool manager in 2024?", options:["Roberto De Zerbi","Xabi Alonso","Arne Slot","Michael Beale"], correctAnswer:2, explanation:"Arne Slot was appointed Liverpool manager in 2024.", points:20, timeLimit:25 },
  { id:"m083", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which country has won the Copa América the most times?", options:["Brazil","Argentina","Uruguay","Chile"], correctAnswer:1, explanation:"Argentina have won the Copa América a record 16 times.", points:20, timeLimit:25 },
  { id:"m084", difficulty:"medium", category:"CLUBS", question:"Which club is nicknamed 'The Toffees'?", options:["Crystal Palace","Sunderland","Everton","Blackpool"], correctAnswer:2, explanation:"Everton FC are nicknamed 'The Toffees'.", points:20, timeLimit:25 },
  { id:"m085", difficulty:"medium", category:"TRANSFERS", question:"Romelu Lukaku returned to Chelsea from Inter Milan for how much in 2021?", options:["£85m","£97.5m","£115m","£120m"], correctAnswer:1, explanation:"Chelsea re-signed Romelu Lukaku from Inter Milan for £97.5 million in 2021.", points:20, timeLimit:25 },
  { id:"m086", difficulty:"medium", category:"HISTORY", question:"Which Bundesliga club famously won three consecutive European Cups from 1974-76?", options:["Borussia Dortmund","Borussia Mönchengladbach","Hamburger SV","Bayern Munich"], correctAnswer:3, explanation:"Bayern Munich won the European Cup in 1974, 1975, and 1976.", points:20, timeLimit:25 },
  { id:"m087", difficulty:"medium", category:"COMPETITIONS", question:"What year was the Premier League founded?", options:["1988","1990","1992","1995"], correctAnswer:2, explanation:"The Premier League was founded in 1992.", points:20, timeLimit:25 },
  { id:"m088", difficulty:"medium", category:"RECORDS", question:"What is the fastest goal ever scored in the Premier League (Shane Long, 2019)?", options:["7.69 seconds","9 seconds","10.5 seconds","12 seconds"], correctAnswer:0, explanation:"Shane Long scored for Southampton against Watford in 7.69 seconds in April 2019 — the fastest goal in Premier League history.", points:20, timeLimit:25 },
  { id:"m089", difficulty:"medium", category:"PLAYERS", question:"Which midfielder was called 'The Engine' at Arsenal by Arsène Wenger?", options:["Patrick Vieira","Emmanuel Petit","Gilberto Silva","Cesc Fàbregas"], correctAnswer:0, explanation:"Patrick Vieira was the powerhouse of Arsenal's midfield through the 1998-2005 era.", points:20, timeLimit:25 },
  { id:"m090", difficulty:"medium", category:"TRANSFERS", question:"Which Premier League club spent the most in the summer window of 2022?", options:["Manchester City","Arsenal","Chelsea","Tottenham"], correctAnswer:2, explanation:"Chelsea spent approximately £270 million in the summer 2022 transfer window.", points:20, timeLimit:25 },
  { id:"m091", difficulty:"medium", category:"HISTORY", question:"The 'Intercontinental Cup' was contested between champions of which two continents?", options:["Europe and South America","Europe and Africa","South America and Asia","North and South America"], correctAnswer:0, explanation:"The Intercontinental Cup was contested between the European Cup winners and Copa Libertadores champions.", points:20, timeLimit:25 },
  { id:"m092", difficulty:"medium", category:"CLUBS", question:"Which Portuguese club are nicknamed 'The Lions'?", options:["Benfica","Porto","Sporting CP","Braga"], correctAnswer:2, explanation:"Sporting CP (Sporting Clube de Portugal) are nicknamed 'Os Leoes' (The Lions).", points:20, timeLimit:25 },
  { id:"m093", difficulty:"medium", category:"PLAYERS", question:"Which player won the Ballon d'Or in 2006 — last non-Messi/Ronaldo winner before Modric in 2018?", options:["Andrés Iniesta","Fabio Cannavaro","Ronaldinho","Thierry Henry"], correctAnswer:1, explanation:"Fabio Cannavaro won the Ballon d'Or in 2006 — the last time it went to someone not named Messi or Ronaldo until Modric in 2018.", points:20, timeLimit:25 },
  { id:"m094", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who captained West Germany to the 1974 World Cup victory?", options:["Gerd Müller","Beckenbauer","Sepp Maier","Paul Breitner"], correctAnswer:1, explanation:"Franz Beckenbauer, 'Der Kaiser', captained West Germany to the 1974 World Cup title.", points:20, timeLimit:25 },
  { id:"m095", difficulty:"medium", category:"MANAGERS", question:"Thomas Tuchel won the Champions League with which club?", options:["Borussia Dortmund","PSG","Chelsea","Bayern Munich"], correctAnswer:2, explanation:"Thomas Tuchel won the Champions League with Chelsea in 2021.", points:20, timeLimit:25 },
  { id:"m096", difficulty:"medium", category:"RECORDS", question:"Miroslav Klose holds the record for most World Cup goals with how many?", options:["12","14","16","18"], correctAnswer:2, explanation:"Miroslav Klose holds the record for most goals in World Cup history with 16 goals.", points:20, timeLimit:25 },
  { id:"m097", difficulty:"medium", category:"PLAYERS", question:"Which player did Cristiano Ronaldo replace at Manchester United (same number 7)?", options:["Ruud van Nistelrooy","Ryan Giggs","David Beckham","Eric Cantona"], correctAnswer:2, explanation:"Cristiano Ronaldo inherited the famous number 7 shirt from David Beckham when he joined Manchester United in 2003.", points:20, timeLimit:25 },
  { id:"m098", difficulty:"medium", category:"CLUBS", question:"What is the name of Napoli's stadium now named after Maradona?", options:["Stadio Diego Armando Maradona","Stadio Olimpico Napoli","Allianz Stadium Napoli","Napoli Arena"], correctAnswer:0, explanation:"Naples renamed their San Paolo stadium the Stadio Diego Armando Maradona following his death in 2020.", points:20, timeLimit:25 },
  { id:"m099", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which World Cup saw Zaire (now DR Congo) concede 14 goals in three games?", options:["1970","1974","1978","1982"], correctAnswer:1, explanation:"Zaire competed at the 1974 World Cup in West Germany and lost all three games, conceding 14 goals.", points:20, timeLimit:25 },
  { id:"m100", difficulty:"medium", category:"TROPHIES", question:"How many times has AC Milan won the Champions League?", options:["5","6","7","8"], correctAnswer:2, explanation:"AC Milan have won the European Cup/Champions League 7 times — second only to Real Madrid.", points:20, timeLimit:25 },
  { id:"m101", difficulty:"medium", category:"HISTORY", question:"When was the first World Cup penalty shootout and between which teams?", options:["West Germany vs France 1982","Italy vs Spain 1986","Argentina vs England 1990","Brazil vs Sweden 1994"], correctAnswer:0, explanation:"The first World Cup penalty shootout was in the 1982 semi-final between West Germany and France in Seville.", points:20, timeLimit:25 },
  { id:"m102", difficulty:"medium", category:"CLUBS", question:"Which club won their domestic league 11 consecutive seasons from 2013-2023?", options:["Borussia Dortmund","Bayer Leverkusen","Bayern Munich","Hamburg"], correctAnswer:2, explanation:"Bayern Munich won 11 consecutive Bundesliga titles from 2013 to 2023.", points:20, timeLimit:25 },
  { id:"m103", difficulty:"medium", category:"PLAYERS", question:"Ryan Giggs scored a legendary solo FA Cup semi-final goal against Arsenal in which year?", options:["1997","1998","1999","2000"], correctAnswer:2, explanation:"Ryan Giggs scored his iconic solo FA Cup semi-final goal against Arsenal in April 1999.", points:20, timeLimit:25 },
  { id:"m104", difficulty:"medium", category:"MANAGERS", question:"Brian Clough managed which club before winning two European Cups with Nottingham Forest?", options:["Leeds United","Coventry City","Hartlepool United","Derby County"], correctAnswer:3, explanation:"Brian Clough managed Derby County before briefly managing Leeds United (44 days) and then Nottingham Forest.", points:20, timeLimit:25 },
  { id:"m105", difficulty:"medium", category:"COMPETITIONS", question:"The 'Battle of the Heysel' stadium disaster in 1985 led to which punishment for English clubs?", options:["1-year ban","Ban from domestic cup","5-year ban from Europe","Permanent ban"], correctAnswer:2, explanation:"After 39 Juventus fans died at Heysel, all English clubs were banned from European competition for 5 years (Liverpool got 6).", points:20, timeLimit:25 },
  { id:"m106", difficulty:"medium", category:"RECORDS", question:"How many goals did Messi score in La Liga for Barcelona (career total)?", options:["400","450","474","500"], correctAnswer:2, explanation:"Lionel Messi scored 474 goals in La Liga for Barcelona — the all-time record for a single club.", points:20, timeLimit:25 },
  { id:"m107", difficulty:"medium", category:"NATIONAL_TEAMS", question:"In which year did Zinedine Zidane score twice in the World Cup final?", options:["1994","1998","2002","2006"], correctAnswer:1, explanation:"Zidane scored twice with headers in the 1998 World Cup final as France beat Brazil 3-0.", points:20, timeLimit:25 },
  { id:"m108", difficulty:"medium", category:"TRANSFERS", question:"Which teenager signed for Atletico Madrid for €126 million in 2019?", options:["Pedri","Ansu Fati","João Félix","Rodrygo"], correctAnswer:2, explanation:"Atletico Madrid signed 19-year-old João Félix from Benfica for €126 million in 2019.", points:20, timeLimit:25 },
  { id:"m109", difficulty:"medium", category:"CLUBS", question:"Which club is nicknamed 'The Invincibles' for their unbeaten 2003/04 season?", options:["Manchester United 2001","Chelsea 2015","Arsenal 2003/04","Liverpool 1988"], correctAnswer:2, explanation:"Arsenal's 2003/04 squad, who went the entire Premier League season unbeaten, are known as 'The Invincibles'.", points:20, timeLimit:25 },
  { id:"m110", difficulty:"medium", category:"HISTORY", question:"Who was the first Black player to captain the England national team?", options:["Viv Anderson","Les Ferdinand","Paul Ince","Stuart Pearce"], correctAnswer:2, explanation:"Paul Ince became the first Black player to captain England in a full international in 1993.", points:20, timeLimit:25 },
  { id:"m111", difficulty:"medium", category:"COMPETITIONS", question:"When was the penalty shootout introduced to World Cup knockout matches?", options:["1970","1978","1982","1986"], correctAnswer:2, explanation:"Penalty shootouts were first used at a World Cup in 1982.", points:20, timeLimit:25 },
  { id:"m112", difficulty:"medium", category:"RECORDS", question:"What's the record transfer fee paid for a defender?", options:["Matthijs de Ligt €85m","Ruben Dias £62m","Harry Maguire £80m","Virgil van Dijk £75m"], correctAnswer:2, explanation:"Harry Maguire joined Manchester United from Leicester City for £80 million in 2019 — a world record for a defender.", points:20, timeLimit:25 },
  { id:"m113", difficulty:"medium", category:"MANAGERS", question:"José Mourinho was sacked by which club during the 2018/19 season?", options:["Chelsea","Real Madrid","Tottenham","Manchester United"], correctAnswer:3, explanation:"Mourinho was sacked by Manchester United in December 2018.", points:20, timeLimit:25 },
  { id:"m114", difficulty:"medium", category:"CLUBS", question:"Real Sociedad are from which Spanish city?", options:["Madrid","Barcelona","San Sebastián","Bilbao"], correctAnswer:2, explanation:"Real Sociedad are based in San Sebastián (Donostia) in the Basque Country.", points:20, timeLimit:25 },
  { id:"m115", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Which World Cup had no European team in the semi-finals for the only time?", options:["1930","1950","1978","2002"], correctAnswer:3, explanation:"At the 2002 World Cup, the semi-finals featured South Korea, Germany, Brazil, and Turkey.", points:20, timeLimit:25 },
  { id:"m116", difficulty:"medium", category:"HISTORY", question:"Who was voted FIFA Player of the Century in 1999?", options:["Diego Maradona","Pelé","Ronaldo","Cruyff"], correctAnswer:1, explanation:"Pelé was voted FIFA Player of the Century by an internet poll, alongside Maradona being honoured.", points:20, timeLimit:25 },
  { id:"m117", difficulty:"medium", category:"PLAYERS", question:"Lev Yashin is the only goalkeeper to have won the Ballon d'Or — in which year?", options:["1958","1963","1968","1972"], correctAnswer:1, explanation:"Lev Yashin won the Ballon d'Or in 1963 — the only goalkeeper to ever win the award.", points:20, timeLimit:25 },
  { id:"m118", difficulty:"medium", category:"TRANSFERS", question:"Which club paid the most for Eden Hazard in 2019?", options:["PSG","Juventus","Real Madrid","Bayern Munich"], correctAnswer:2, explanation:"Eden Hazard joined Real Madrid from Chelsea in the summer of 2019 for around €100 million.", points:20, timeLimit:25 },
  { id:"m119", difficulty:"medium", category:"CLUBS", question:"Sunderland and Newcastle United share what rivalry?", options:["Derby of the North","Steel City Derby","The Tyne-Wear Derby","The Geordie Derby"], correctAnswer:2, explanation:"The Tyne-Wear Derby is the intense rivalry between Newcastle United and Sunderland.", points:20, timeLimit:25 },
  { id:"m120", difficulty:"medium", category:"HISTORY", question:"AC Milan were involved in which Italian betting scandal?", options:["Match-fixing in Serie A","The Totonero betting scandal","Illegal player payments","Doping violations"], correctAnswer:1, explanation:"The Totonero betting scandal in 1980 resulted in AC Milan and Lazio being relegated.", points:20, timeLimit:25 },
  { id:"m121", difficulty:"medium", category:"COMPETITIONS", question:"How many teams from England typically compete in the UEFA Champions League?", options:["3","4","5","2"], correctAnswer:1, explanation:"Typically 4 English clubs qualify for the Champions League — the top four finishers in the Premier League.", points:20, timeLimit:25 },
  { id:"m122", difficulty:"medium", category:"PLAYERS", question:"Who scored the winning goal for Germany in the 2014 World Cup final?", options:["Thomas Müller","Miroslav Klose","Toni Kroos","Mario Götze"], correctAnswer:3, explanation:"Mario Götze scored a stunning extra-time volley to beat Argentina 1-0 in the 2014 World Cup final.", points:20, timeLimit:25 },
  { id:"m123", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Croatia's best World Cup finish was third place in which year?", options:["1998","2018","2022","2006"], correctAnswer:0, explanation:"Croatia finished third in the 1998 World Cup in France, with Davor Suker winning the Golden Boot.", points:20, timeLimit:25 },
  { id:"m124", difficulty:"medium", category:"TROPHIES", question:"Who was the first Asian player to win the Ballon d'Or?", options:["Hidetoshi Nakata","Sun Jihai","No Asian player has won it","Ali Daei"], correctAnswer:2, explanation:"No Asian player has ever won the Ballon d'Or.", points:20, timeLimit:25 },
  { id:"m125", difficulty:"medium", category:"CLUBS", question:"Which French club won the Champions League in 1993?", options:["PSG","Lyon","Marseille","Monaco"], correctAnswer:2, explanation:"Olympique de Marseille won the 1993 Champions League — the only French club to do so.", points:20, timeLimit:25 },
  { id:"m126", difficulty:"medium", category:"MANAGERS", question:"Which manager led Wigan Athletic to a shock FA Cup win in 2013?", options:["Crystal Palace","Wigan Athletic","Stoke City","Hull City"], correctAnswer:1, explanation:"Roberto Martínez led Wigan Athletic to a stunning FA Cup final victory over Manchester City in 2013.", points:20, timeLimit:25 },
  { id:"m127", difficulty:"medium", category:"HISTORY", question:"What year did Arsenal move from Highbury to the Emirates Stadium?", options:["2004","2005","2006","2007"], correctAnswer:2, explanation:"Arsenal moved from their historic Highbury ground to the Emirates Stadium in 2006.", points:20, timeLimit:25 },
  { id:"m128", difficulty:"medium", category:"RECORDS", question:"Which club has the highest average attendance in world football?", options:["Manchester United","Real Madrid","Borussia Dortmund","Barcelona"], correctAnswer:2, explanation:"Borussia Dortmund regularly record the highest average attendances in world club football.", points:20, timeLimit:25 },
  { id:"m129", difficulty:"medium", category:"PLAYERS", question:"Who scored in the 1988 Euro final — a volley described as the most beautiful goal of the 20th century?", options:["Ruud Gullit","Marco van Basten","Frank Rijkaard","Ronald Koeman"], correctAnswer:1, explanation:"Marco van Basten's extraordinary right-foot volley against the USSR in the 1988 Euro final was voted UEFA's most beautiful goal.", points:20, timeLimit:25 },
  { id:"m130", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who scored two headers in the 1998 World Cup final as France beat Brazil?", options:["Thierry Henry","Zinedine Zidane","David Trezeguet","Emmanuel Petit"], correctAnswer:1, explanation:"Zinedine Zidane scored twice with headers in the 1998 World Cup final as France won 3-0.", points:20, timeLimit:25 },
  { id:"m131", difficulty:"medium", category:"CLUBS", question:"Which club's official name is Sociedade Esportiva Palmeiras?", options:["Palmeiras","Flamengo","Corinthians","Santos"], correctAnswer:0, explanation:"Sociedade Esportiva Palmeiras, known simply as Palmeiras, are one of Brazil's most successful clubs.", points:20, timeLimit:25 },
  { id:"m132", difficulty:"medium", category:"MANAGERS", question:"Who managed AC Milan to back-to-back European Cups in 1989 and 1990?", options:["Fabio Capello","Arrigo Sacchi","Silvio Berlusconi","Nils Liedholm"], correctAnswer:1, explanation:"Arrigo Sacchi's AC Milan, with Van Basten, Gullit, and Rijkaard, won consecutive European Cups in 1989 and 1990.", points:20, timeLimit:25 },
  { id:"m133", difficulty:"medium", category:"COMPETITIONS", question:"Which country hosted Euro 2012?", options:["France","Poland and Ukraine","Germany","Sweden and Norway"], correctAnswer:1, explanation:"Euro 2012 was co-hosted by Poland and Ukraine, with Spain winning the tournament.", points:20, timeLimit:25 },
  { id:"m134", difficulty:"medium", category:"RECORDS", question:"The fastest goal ever scored in the Premier League was 7.69 seconds — by which player?", options:["Wayne Rooney","Shane Long","James Milner","Robbie Fowler"], correctAnswer:1, explanation:"Shane Long scored for Southampton against Watford in 7.69 seconds in April 2019.", points:20, timeLimit:25 },
  { id:"m135", difficulty:"medium", category:"TRANSFERS", question:"Which player moved from Manchester City to rival club for headlines in 2023?", options:["Yaya Touré","Kevin De Bruyne","Ilkay Gündogan","Raheem Sterling"], correctAnswer:2, explanation:"Ilkay Gündogan joined Barcelona in 2023 after his Manchester City contract expired as a free transfer.", points:20, timeLimit:25 },
  { id:"m136", difficulty:"medium", category:"CLUBS", question:"Which African club has won the CAF Champions League most times?", options:["Zamalek","Al-Ahly","Esperance","Hearts of Oak"], correctAnswer:1, explanation:"Al-Ahly of Egypt have won the CAF Champions League a record 12 times.", points:20, timeLimit:25 },
  { id:"m137", difficulty:"medium", category:"HISTORY", question:"The 'Bosman Ruling' was named after which Belgian player?", options:["Eric Bosman","Jean-Marc Bosman","Robert Bosman","Pierre Bosman"], correctAnswer:1, explanation:"The landmark 1995 ruling was named after Belgian footballer Jean-Marc Bosman, who challenged restrictions on player movement.", points:20, timeLimit:25 },
  { id:"m138", difficulty:"medium", category:"PLAYERS", question:"Which Frenchman won the Ballon d'Or in both 1998 and 2000?", options:["Marcel Desailly","Laurent Blanc","Zinedine Zidane","Patrick Vieira"], correctAnswer:2, explanation:"Zinedine Zidane won the Ballon d'Or in 1998 and 2000.", points:20, timeLimit:25 },
  { id:"m139", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who scored the penalty that sealed France as 2018 World Cup champions?", options:["Kylian Mbappé","Hugo Lloris","Antoine Griezmann","Paul Pogba"], correctAnswer:2, explanation:"Antoine Griezmann scored from the penalty spot to give France a 2-1 lead in the 2018 World Cup final.", points:20, timeLimit:25 },
  { id:"m140", difficulty:"medium", category:"COMPETITIONS", question:"When was the penalty shootout first used at a World Cup?", options:["1970","1978","1982","1986"], correctAnswer:2, explanation:"Penalty shootouts were first used at a World Cup in 1982, with the West Germany vs France semi-final.", points:20, timeLimit:25 },
  { id:"m141", difficulty:"medium", category:"RECORDS", question:"Who scored the most hat-tricks in La Liga history?", options:["Hugo Sánchez","Telmo Zarra","Lionel Messi","Cristiano Ronaldo"], correctAnswer:2, explanation:"Lionel Messi scored 36 hat-tricks in La Liga — the most by any player in the competition's history.", points:20, timeLimit:25 },
  { id:"m142", difficulty:"medium", category:"CLUBS", question:"Which club won the first ever Europa League (formerly UEFA Cup) in 2009/10?", options:["Benfica","Atletico Madrid","Fulham","Hamburger SV"], correctAnswer:1, explanation:"Atletico Madrid won the inaugural UEFA Europa League in 2009/10.", points:20, timeLimit:25 },
  { id:"m143", difficulty:"medium", category:"PLAYERS", question:"Who holds the record for most appearances in La Liga history?", options:["Xavi Hernández","Andoni Zubizarreta","Joaquín Sánchez","Iker Casillas"], correctAnswer:2, explanation:"Joaquín Sánchez made 651 La Liga appearances over his long career — the most in the competition's history.", points:20, timeLimit:25 },
  { id:"m144", difficulty:"medium", category:"MANAGERS", question:"Who managed Spain to their historic first World Cup title in 2010?", options:["José Antonio Camacho","Vicente del Bosque","Luis Aragonés","Juande Ramos"], correctAnswer:1, explanation:"Vicente del Bosque guided Spain to World Cup glory in 2010 in South Africa.", points:20, timeLimit:25 },
  { id:"m145", difficulty:"medium", category:"HISTORY", question:"Which English club had the 'Crazy Gang' nickname in the 1980s and won the FA Cup in 1988?", options:["Crystal Palace","Watford","Wimbledon","QPR"], correctAnswer:2, explanation:"Wimbledon FC became known as 'The Crazy Gang' and famously upset Liverpool in the 1988 FA Cup final.", points:20, timeLimit:25 },
  { id:"m146", difficulty:"medium", category:"COMPETITIONS", question:"The 'Super Cup' in Germany (DFL-Supercup) is played between which two teams?", options:["Top two in Bundesliga","Bundesliga champions and DFB-Pokal holders","Bottom two to avoid relegation","Last season's top four"], correctAnswer:1, explanation:"The DFL Supercup is played between the Bundesliga champions and the DFB-Pokal winners.", points:20, timeLimit:25 },
  { id:"m147", difficulty:"medium", category:"RECORDS", question:"How many goals did Cristiano Ronaldo score in Premier League hat-tricks?", options:["3","5","10","15"], correctAnswer:1, explanation:"Cristiano Ronaldo scored 5 hat-tricks in the Premier League for Manchester United.", points:20, timeLimit:25 },
  { id:"m148", difficulty:"medium", category:"NATIONAL_TEAMS", question:"Who scored the decisive penalty miss for France in the 2022 World Cup final shootout?", options:["Kylian Mbappé","Kingsley Coman","Aurelien Tchouaméni","Randal Kolo Muani"], correctAnswer:2, explanation:"Aurelien Tchouaméni missed France's first penalty in the 2022 World Cup final shootout.", points:20, timeLimit:25 },
  { id:"m149", difficulty:"medium", category:"CLUBS", question:"Which club did Pep Guardiola join after leaving Bayern Munich in 2016?", options:["Real Madrid","Manchester United","Manchester City","PSG"], correctAnswer:2, explanation:"Pep Guardiola joined Manchester City in 2016, going on to dominate English football.", points:20, timeLimit:25 },
  { id:"m150", difficulty:"medium", category:"PLAYERS", question:"Which player made his World Cup debut as a 17-year-old and went on to win it three times?", options:["Johan Cruyff","Ronaldo","Pelé","Zico"], correctAnswer:2, explanation:"Pelé was 17 when he played for Brazil at the 1958 World Cup and went on to win it in 1958, 1962, and 1970.", points:20, timeLimit:25 },
];

const hardQuestions = [
  { id:"h001", difficulty:"hard", category:"RECORDS", question:"Which goalkeeper holds the record for most Premier League clean sheets?", options:["Peter Schmeichel","David Seaman","Petr Čech","Edwin van der Sar"], correctAnswer:2, explanation:"Petr Čech kept 202 clean sheets in his Premier League career with Chelsea and Arsenal.", points:30, timeLimit:20 },
  { id:"h002", difficulty:"hard", category:"HISTORY", question:"What was the exact scoreline of the 1954 World Cup Final between West Germany and Hungary?", options:["3-2","4-2","2-1","3-1"], correctAnswer:0, explanation:"West Germany beat Hungary 3-2 in the 1954 World Cup final — 'The Miracle of Bern'.", points:30, timeLimit:20 },
  { id:"h003", difficulty:"hard", category:"PLAYERS", question:"Eusébio represented Portugal at the 1966 World Cup — how many goals did he score?", options:["6","7","8","9"], correctAnswer:3, explanation:"Eusébio scored 9 goals at the 1966 World Cup, winning the Golden Boot.", points:30, timeLimit:20 },
  { id:"h004", difficulty:"hard", category:"RECORDS", question:"Who holds the record for the most assists in a single Champions League season?", options:["Kevin De Bruyne","Cristiano Ronaldo","Neymar","Thomas Müller"], correctAnswer:0, explanation:"Kevin De Bruyne holds the record with 8 assists in a single Champions League season for Manchester City.", points:30, timeLimit:20 },
  { id:"h005", difficulty:"hard", category:"CLUBS", question:"In which year was Real Madrid officially founded?", options:["1895","1900","1902","1910"], correctAnswer:2, explanation:"Real Madrid Football Club was founded on 6 March 1902.", points:30, timeLimit:20 },
  { id:"h006", difficulty:"hard", category:"HISTORY", question:"The first ever World Cup final in 1930 was played at which stadium?", options:["Estadio Centenario","Estadio Nacional","Maracanã","La Bombonera"], correctAnswer:0, explanation:"The 1930 World Cup final was played at the Estadio Centenario in Montevideo, Uruguay.", points:30, timeLimit:20 },
  { id:"h007", difficulty:"hard", category:"COMPETITIONS", question:"What is the exact circumference of a FIFA-approved football (size 5)?", options:["65-67cm","68-70cm","71-73cm","63-65cm"], correctAnswer:1, explanation:"A size 5 football must have a circumference of 68-70cm as per FIFA's Laws of the Game.", points:30, timeLimit:20 },
  { id:"h008", difficulty:"hard", category:"RECORDS", question:"Which player has the most appearances in the history of Real Madrid?", options:["Iker Casillas","Raúl","Sergio Ramos","Cristiano Ronaldo"], correctAnswer:0, explanation:"Iker Casillas made 725 appearances for Real Madrid — the most in the club's history.", points:30, timeLimit:20 },
  { id:"h009", difficulty:"hard", category:"CLUBS", question:"Which club holds the record for most consecutive Serie A titles (9 in a row)?", options:["Juventus","AC Milan","Inter Milan","AS Roma"], correctAnswer:0, explanation:"Juventus won nine consecutive Serie A titles from 2012 to 2020.", points:30, timeLimit:20 },
  { id:"h010", difficulty:"hard", category:"HISTORY", question:"Who scored in every round of the 1999 Champions League for Manchester United?", options:["Dwight Yorke","Peter Schmeichel","Andy Cole","Ole Gunnar Solskjaer"], correctAnswer:0, explanation:"Dwight Yorke scored in every round of United's famous 1998/99 Champions League campaign.", points:30, timeLimit:20 },
  { id:"h011", difficulty:"hard", category:"PLAYERS", question:"Johan Cruyff wore which squad number for the Netherlands at the 1974 World Cup?", options:["9","10","11","14"], correctAnswer:3, explanation:"Johan Cruyff famously wore the number 14 shirt — a number so linked to him it was retired by Barcelona.", points:30, timeLimit:20 },
  { id:"h012", difficulty:"hard", category:"COMPETITIONS", question:"Who was the referee for the 1998 World Cup final between France and Brazil?", options:["Pierluigi Collina","Said Belqola","Kim Milton Nielsen","Hugh Dallas"], correctAnswer:1, explanation:"Said Belqola, a Moroccan referee, took charge of the 1998 World Cup final.", points:30, timeLimit:20 },
  { id:"h013", difficulty:"hard", category:"RECORDS", question:"Which player scored the most hat-tricks in La Liga history?", options:["Hugo Sánchez","Telmo Zarra","Lionel Messi","Cristiano Ronaldo"], correctAnswer:2, explanation:"Lionel Messi scored 36 hat-tricks in La Liga — the most by any player.", points:30, timeLimit:20 },
  { id:"h014", difficulty:"hard", category:"CLUBS", question:"Which South American club has won the Copa Libertadores the most times?", options:["Boca Juniors","Independiente","River Plate","Flamengo"], correctAnswer:1, explanation:"Independiente of Argentina have won the Copa Libertadores a record 7 times.", points:30, timeLimit:20 },
  { id:"h015", difficulty:"hard", category:"HISTORY", question:"How many countries took part in the first FIFA World Cup in 1930?", options:["8","12","13","16"], correctAnswer:2, explanation:"13 countries participated in the inaugural 1930 World Cup in Uruguay.", points:30, timeLimit:20 },
  { id:"h016", difficulty:"hard", category:"PLAYERS", question:"Who was the last player to win the Ballon d'Or before Messi and Ronaldo dominated?", options:["Andrés Iniesta","Fabio Cannavaro","Ronaldinho","Thierry Henry"], correctAnswer:1, explanation:"Fabio Cannavaro won the Ballon d'Or in 2006 — the last time before Messi and Ronaldo's era of dominance.", points:30, timeLimit:20 },
  { id:"h017", difficulty:"hard", category:"MANAGERS", question:"Who managed the Netherlands to the 1974 World Cup final playing 'Total Football'?", options:["Louis van Gaal","Johan Cruyff","Rinus Michels","Bert van Marwijk"], correctAnswer:2, explanation:"Rinus Michels, the 'God of Football', managed the Dutch national team in 1974 and popularised 'Total Football'.", points:30, timeLimit:20 },
  { id:"h018", difficulty:"hard", category:"RECORDS", question:"What is the longest unbeaten run in international football history?", options:["Italy — 37 games","Brazil — 44 games","Spain — 35 games","Algeria — 35 games"], correctAnswer:1, explanation:"Brazil hold the record for the longest unbeaten run in international football — 44 matches between 1993 and 1996.", points:30, timeLimit:20 },
  { id:"h019", difficulty:"hard", category:"HISTORY", question:"In which year did Pelé score his 1,000th career goal?", options:["1967","1969","1972","1974"], correctAnswer:1, explanation:"Pelé scored his 1,000th career goal on 19 November 1969 from the penalty spot for Santos against Vasco da Gama.", points:30, timeLimit:20 },
  { id:"h020", difficulty:"hard", category:"COMPETITIONS", question:"The UEFA Intertoto Cup was merged into which competition in 2008?", options:["Champions League","Europa League","Cup Winners Cup","Conference League"], correctAnswer:1, explanation:"The UEFA Intertoto Cup was discontinued in 2008 and absorbed into the UEFA Cup (later Europa League).", points:30, timeLimit:20 },
  { id:"h021", difficulty:"hard", category:"CLUBS", question:"Which club invented the 'Christmas Tree' (4-3-2-1) formation under Marcello Lippi?", options:["Juventus","AC Milan","Internazionale","Torino"], correctAnswer:0, explanation:"Juventus popularised the Christmas Tree formation (4-3-2-1) under Marcello Lippi in the late 1990s.", points:30, timeLimit:20 },
  { id:"h022", difficulty:"hard", category:"HISTORY", question:"Who scored Argentina's winning goal in the 1986 World Cup final vs West Germany?", options:["Jorge Valdano","Jorge Burruchaga","José Luis Brown","Ricardo Giusti"], correctAnswer:1, explanation:"Jorge Burruchaga scored the dramatic winner in the 86th minute to give Argentina a 3-2 victory in the 1986 World Cup final.", points:30, timeLimit:20 },
  { id:"h023", difficulty:"hard", category:"PLAYERS", question:"Marco van Basten's Euro 1988 final volley is often called what?", options:["The Volley of the Century","The Miracle Volley","The Most Beautiful Goal of the 20th Century","The Goal that Defined a Generation"], correctAnswer:2, explanation:"Marco van Basten's volley against the USSR in the 1988 Euro final was voted UEFA's most beautiful goal of the 20th century.", points:30, timeLimit:20 },
  { id:"h024", difficulty:"hard", category:"TRANSFERS", question:"How much did Manchester City pay for Kevin De Bruyne in 2015?", options:["£50m","£55m","£70m","£76m"], correctAnswer:1, explanation:"Manchester City signed Kevin De Bruyne from VfL Wolfsburg for £55 million in the summer of 2015.", points:30, timeLimit:20 },
  { id:"h025", difficulty:"hard", category:"COMPETITIONS", question:"The Intercontinental Cup was often called the Toyota Cup — which company sponsored it from 1980?", options:["Toyota","Sony","Nintendo","Panasonic"], correctAnswer:0, explanation:"Toyota sponsored the Intercontinental Cup from 1980 onwards.", points:30, timeLimit:20 },
  { id:"h026", difficulty:"hard", category:"MANAGERS", question:"Who managed Liverpool to their first and second European Cups in 1977 and 1978?", options:["Kenny Dalglish","Bob Paisley","Bill Shankly","Ron Moran"], correctAnswer:1, explanation:"Bob Paisley won three European Cups with Liverpool (1977, 1978, 1981) — the most successful British manager in European competition.", points:30, timeLimit:20 },
  { id:"h027", difficulty:"hard", category:"RECORDS", question:"The highest ever crowd recorded at a football match was at which game?", options:["A league match","The 1950 World Cup final at the Maracanã","1966 World Cup final","A Copa Libertadores final"], correctAnswer:1, explanation:"The 1950 World Cup final between Uruguay and Brazil at the Maracanã is estimated to have held approximately 200,000 people.", points:30, timeLimit:20 },
  { id:"h028", difficulty:"hard", category:"PLAYERS", question:"Which player was nicknamed 'The Black Panther' and scored 9 goals at the 1966 World Cup?", options:["Garrincha","Eusébio","Pelé","Didí"], correctAnswer:1, explanation:"Eusébio, born in Mozambique and playing for Portugal, was nicknamed 'The Black Panther' and won the 1966 Golden Boot.", points:30, timeLimit:20 },
  { id:"h029", difficulty:"hard", category:"CLUBS", question:"Celta Vigo are based in which Spanish region?", options:["Catalonia","Andalusia","Galicia","Basque Country"], correctAnswer:2, explanation:"Celta Vigo are from Vigo, a port city in Galicia, the Celtic-influenced region of northwestern Spain.", points:30, timeLimit:20 },
  { id:"h030", difficulty:"hard", category:"HISTORY", question:"Heysel, Bradford City fire, and Hillsborough all occurred in which decade?", options:["1970s","1980s","1990s","2000s"], correctAnswer:1, explanation:"All three disasters occurred in the 1980s: Bradford (1985), Heysel (1985), and Hillsborough (1989).", points:30, timeLimit:20 },
  { id:"h031", difficulty:"hard", category:"CLUBS", question:"Which German club holds the record for the most Bundesliga titles?", options:["Borussia Dortmund","Bayer Leverkusen","Bayern Munich","Hamburger SV"], correctAnswer:2, explanation:"Bayern Munich have won a record 32 Bundesliga titles as of 2023.", points:30, timeLimit:20 },
  { id:"h032", difficulty:"hard", category:"RECORDS", question:"Who holds the record for most appearances in La Liga history?", options:["Xavi Hernández","Andoni Zubizarreta","Joaquín Sánchez","Iker Casillas"], correctAnswer:2, explanation:"Joaquín Sánchez made 651 La Liga appearances over his long career.", points:30, timeLimit:20 },
  { id:"h033", difficulty:"hard", category:"PLAYERS", question:"Which Dutch player invented and performed the famous 'Cruyff Turn'?", options:["Ruud Gullit","Johan Cruyff","Dennis Bergkamp","Arjen Robben"], correctAnswer:1, explanation:"The 'Cruyff Turn' was first demonstrated by Johan Cruyff against Swedish right-back Jan Olsson during the 1974 World Cup.", points:30, timeLimit:20 },
  { id:"h034", difficulty:"hard", category:"COMPETITIONS", question:"In the 1950 World Cup, how was the winner determined?", options:["Finals knockout","Two-legged playoff","Final round-robin group","Penalty shootout among top 4"], correctAnswer:2, explanation:"The 1950 World Cup had a final round-robin group of four teams instead of a traditional final.", points:30, timeLimit:20 },
  { id:"h035", difficulty:"hard", category:"MANAGERS", question:"Which manager invented the 'gegenpressing' style associated with modern German football?", options:["Ralf Rangnick","Jürgen Klopp","Pep Guardiola","Thomas Tuchel"], correctAnswer:0, explanation:"Ralf Rangnick is widely regarded as the godfather of the high-pressing 'gegenpressing' philosophy.", points:30, timeLimit:20 },
  { id:"h036", difficulty:"hard", category:"RECORDS", question:"Who scored the most goals in a single Copa América tournament?", options:["Pelé","Humberto Maschio","Norberto Méndez","Zizinho"], correctAnswer:1, explanation:"Humberto Maschio scored 9 goals for Argentina at the 1957 Copa América.", points:30, timeLimit:20 },
  { id:"h037", difficulty:"hard", category:"HISTORY", question:"Which two cities co-hosted the 2002 World Cup for the first time?", options:["Germany and France","Japan and South Korea","USA and Mexico","Australia and New Zealand"], correctAnswer:1, explanation:"Japan and South Korea co-hosted the 2002 World Cup — the first time held in Asia.", points:30, timeLimit:20 },
  { id:"h038", difficulty:"hard", category:"CLUBS", question:"In Serie A, what is a 'derby della Madonnina'?", options:["Inter Milan vs Juventus","AC Milan vs Napoli","AC Milan vs Inter Milan","AS Roma vs Lazio"], correctAnswer:2, explanation:"The Milan derby between AC Milan and Inter Milan is known as the 'Derby della Madonnina'.", points:30, timeLimit:20 },
  { id:"h039", difficulty:"hard", category:"PLAYERS", question:"Which player was voted the best in the world in both 2004 and 2005 before Messi/Ronaldo?", options:["Ronaldinho","Thierry Henry","Andriy Shevchenko","Samuel Eto'o"], correctAnswer:0, explanation:"Ronaldinho won the FIFA World Player of the Year in both 2004 and 2005.", points:30, timeLimit:20 },
  { id:"h040", difficulty:"hard", category:"NATIONAL_TEAMS", question:"Which nation won the most matches in a single World Cup without winning the trophy (1954)?", options:["Hungary 1954","Netherlands 2010","Brazil 2014","France 2006"], correctAnswer:0, explanation:"The Hungarian 'Golden Team' of 1954 won all five matches before the final, only to lose the final to West Germany.", points:30, timeLimit:20 },
  { id:"h041", difficulty:"hard", category:"TRANSFERS", question:"Who did Real Madrid sign for a then-world record by signing from Barcelona controversially in 2000?", options:["Roberto Carlos","Fernando Hierro","Claude Makélélé","Luis Figo"], correctAnswer:3, explanation:"Real Madrid signed Luis Figo from Barcelona for a then-world record £37 million in 2000 — creating one of football's greatest controversies.", points:30, timeLimit:20 },
  { id:"h042", difficulty:"hard", category:"COMPETITIONS", question:"The Golden Goal rule (sudden death) was abolished by UEFA in which year?", options:["2000","2002","2004","2006"], correctAnswer:2, explanation:"UEFA abolished the Golden Goal and Silver Goal rules after Euro 2004.", points:30, timeLimit:20 },
  { id:"h043", difficulty:"hard", category:"MANAGERS", question:"Who managed Napoli to their first ever Serie A title in 1987?", options:["Marcello Lippi","Ottavio Bianchi","Alberto Bigon","Luciano Spalletti"], correctAnswer:1, explanation:"Ottavio Bianchi managed Napoli to their historic first Italian league title in 1986/87.", points:30, timeLimit:20 },
  { id:"h044", difficulty:"hard", category:"RECORDS", question:"The record attendance for a women's football match was at the 1999 World Cup final — how many?", options:["60,000","80,000","90,185","100,000"], correctAnswer:2, explanation:"The 1999 Women's World Cup final between USA and China at the Rose Bowl drew 90,185 fans.", points:30, timeLimit:20 },
  { id:"h045", difficulty:"hard", category:"CLUBS", question:"Who are Red Star Belgrade's main rivals?", options:["Vojvodina","Partizan","OFK Belgrade","Cukaricki"], correctAnswer:1, explanation:"The 'Eternal Derby' between Red Star Belgrade and Partizan Belgrade is one of the most intense rivalries in world football.", points:30, timeLimit:20 },
  { id:"h046", difficulty:"hard", category:"HISTORY", question:"When was the first ever football match broadcast on radio in England?", options:["1921","1927","1934","1945"], correctAnswer:1, explanation:"The first live BBC radio commentary of a football match was Arsenal vs Sheffield United on 22 January 1927.", points:30, timeLimit:20 },
  { id:"h047", difficulty:"hard", category:"COMPETITIONS", question:"How many substitutes can a manager make in the UEFA Champions League (from 2020/21)?", options:["3","4","5","6"], correctAnswer:2, explanation:"Since the 2020/21 season, UEFA allows managers to make 5 substitutions per game in the Champions League.", points:30, timeLimit:20 },
  { id:"h048", difficulty:"hard", category:"CLUBS", question:"What is Boca Juniors' nickname?", options:["Los Galácticos","Los Millonarios","La Bombonera","Xeneizes"], correctAnswer:3, explanation:"Boca Juniors are nicknamed 'Los Xeneizes' because many of their founding members were Genoese immigrants.", points:30, timeLimit:20 },
  { id:"h049", difficulty:"hard", category:"PLAYERS", question:"In which season did Thierry Henry win both the Golden Boot and European Golden Shoe?", options:["2002/03","2003/04","2004/05","2005/06"], correctAnswer:1, explanation:"Thierry Henry won both the Premier League Golden Boot and the European Golden Shoe in the 2003/04 Invincibles season.", points:30, timeLimit:20 },
  { id:"h050", difficulty:"hard", category:"NATIONAL_TEAMS", question:"Which World Cup did Argentina win under Menotti?", options:["1974","1978","1982","1986"], correctAnswer:1, explanation:"Argentina won the 1978 World Cup on home soil under coach César Luis Menotti.", points:30, timeLimit:20 },
  { id:"h051", difficulty:"hard", category:"HISTORY", question:"The first numbered shirts in England were worn in which FA Cup final?", options:["1928","1933","1938","1946"], correctAnswer:1, explanation:"Everton and Manchester City first wore numbered shirts at the 1933 FA Cup final — 1-11 and 12-22 respectively.", points:30, timeLimit:20 },
  { id:"h052", difficulty:"hard", category:"RECORDS", question:"What squad number did Francesco Totti wear throughout his career at Roma?", options:["8","9","10","11"], correctAnswer:2, explanation:"Francesco Totti wore the number 10 shirt for Roma throughout his 25-year one-club career.", points:30, timeLimit:20 },
  { id:"h053", difficulty:"hard", category:"CLUBS", question:"Which English club has never been relegated from the top flight since 1954?", options:["Arsenal","Tottenham Hotspur","Liverpool","Everton"], correctAnswer:3, explanation:"Everton have never been relegated from the top flight since 1954 — the longest unbroken run.", points:30, timeLimit:20 },
  { id:"h054", difficulty:"hard", category:"PLAYERS", question:"Who was the first player to score 5 goals in a single Champions League match?", options:["Cristiano Ronaldo","Luiz Adriano","Lionel Messi","Marco Simone"], correctAnswer:1, explanation:"Luiz Adriano scored 5 goals for Shakhtar Donetsk against BATE Borisov in October 2014.", points:30, timeLimit:20 },
  { id:"h055", difficulty:"hard", category:"COMPETITIONS", question:"The Confederations Cup was discontinued after which year?", options:["2013","2017","2019","2021"], correctAnswer:1, explanation:"The FIFA Confederations Cup was held for the last time in 2017 in Russia, won by Germany.", points:30, timeLimit:20 },
  { id:"h056", difficulty:"hard", category:"HISTORY", question:"Which World Cup final was the first to be broadcast live on global television?", options:["1954","1958","1966","1970"], correctAnswer:2, explanation:"The 1966 World Cup final between England and West Germany was the first to be truly broadcast globally.", points:30, timeLimit:20 },
  { id:"h057", difficulty:"hard", category:"MANAGERS", question:"Who managed Spain to complete the Euro 2008 + WC 2010 + Euro 2012 treble?", options:["José Antonio Camacho","Vicente del Bosque","Luis Aragonés","Juande Ramos"], correctAnswer:1, explanation:"Vicente del Bosque guided Spain to this unprecedented international treble.", points:30, timeLimit:20 },
  { id:"h058", difficulty:"hard", category:"TRANSFERS", question:"Alfredo Di Stéfano's controversial transfer saw which two clubs both claim to have signed him?", options:["Real Madrid and Atletico","Real Madrid and Barcelona","Atletico and Barcelona","Benfica and Real Madrid"], correctAnswer:1, explanation:"Di Stéfano was controversially signed by both Real Madrid and Barcelona from Millonarios. Real Madrid kept him.", points:30, timeLimit:20 },
  { id:"h059", difficulty:"hard", category:"RECORDS", question:"Which player has made the most career appearances in professional football history?", options:["Ryan Giggs","Gerd Müller","Pelé","Goalkeeping record holder"], correctAnswer:0, explanation:"Ryan Giggs holds the record for most appearances in the Premier League era and is among the highest in English football history with 963 appearances.", points:30, timeLimit:20 },
  { id:"h060", difficulty:"hard", category:"PLAYERS", question:"Ferenc Puskás scored how many goals in 85 international appearances for Hungary?", options:["74","79","84","90"], correctAnswer:2, explanation:"Ferenc Puskás scored 84 goals in 85 international appearances for Hungary.", points:30, timeLimit:20 },
  { id:"h061", difficulty:"hard", category:"NATIONAL_TEAMS", question:"In which year did England win their only World Cup?", options:["1958","1962","1966","1970"], correctAnswer:2, explanation:"England won the World Cup in 1966 on home soil, defeating West Germany 4-2 in the final at Wembley.", points:30, timeLimit:20 },
  { id:"h062", difficulty:"hard", category:"COMPETITIONS", question:"How many teams competed in the first FIFA World Cup (1930)?", options:["12","13","16","18"], correctAnswer:1, explanation:"13 nations competed in the 1930 World Cup held in Uruguay.", points:30, timeLimit:20 },
  { id:"h063", difficulty:"hard", category:"CLUBS", question:"Which South American club is nicknamed 'O Glorioso' (The Glorious One)?", options:["Fluminense","Vasco da Gama","Flamengo","Botafogo"], correctAnswer:3, explanation:"Botafogo de Futebol e Regatas are nicknamed 'O Glorioso' (The Glorious One).", points:30, timeLimit:20 },
  { id:"h064", difficulty:"hard", category:"HISTORY", question:"The term 'Soccer' originates from which country?", options:["USA","Australia","England","Canada"], correctAnswer:2, explanation:"'Soccer' is an English abbreviation of 'Association Football' ('assoc.' to 'soccer'), coined in England in the late 19th century.", points:30, timeLimit:20 },
  { id:"h065", difficulty:"hard", category:"PLAYERS", question:"Lev Yashin is said to have saved approximately how many penalty kicks in his career?", options:["About 50","About 75","About 100","About 150"], correctAnswer:3, explanation:"Lev Yashin is said to have saved approximately 150 penalty kicks in his career and kept over 270 clean sheets.", points:30, timeLimit:20 },
  { id:"h066", difficulty:"hard", category:"RECORDS", question:"England's Geoff Hurst scored which kind of goal in the controversial 1966 World Cup final?", options:["Free kick","Corner","Volley","Disputed goal that may not have crossed the line"], correctAnswer:3, explanation:"Geoff Hurst's shot hit the crossbar and bounced down — the linesman ruled it crossed the line, but controversy persists.", points:30, timeLimit:20 },
  { id:"h067", difficulty:"hard", category:"COMPETITIONS", question:"Three points for a win was introduced in the Football League (England) in which season?", options:["1979/80","1981/82","1983/84","1985/86"], correctAnswer:1, explanation:"The Football League introduced three points for a win in the 1981/82 season.", points:30, timeLimit:20 },
  { id:"h068", difficulty:"hard", category:"MANAGERS", question:"Who is the only manager to win two FIFA World Cups (1934 and 1938)?", options:["Herbert Chapman","Bill Nicholson","Alf Ramsey","Vittorio Pozzo"], correctAnswer:3, explanation:"Vittorio Pozzo is the only manager to win two World Cups (1934 and 1938 with Italy).", points:30, timeLimit:20 },
  { id:"h069", difficulty:"hard", category:"NATIONAL_TEAMS", question:"Which Argentinian scored twice against England in the 1986 World Cup in the same match as 'Hand of God'?", options:["Jorge Valdano","Maradona","Burruchaga","Caniggia"], correctAnswer:1, explanation:"Diego Maradona scored both of Argentina's goals against England in the 1986 quarter-final — the 'Hand of God' and the 'Goal of the Century'.", points:30, timeLimit:20 },
  { id:"h070", difficulty:"hard", category:"CLUBS", question:"Which club did Brian Clough manage before his famous 44 days at Leeds?", options:["Derby County","Hartlepool United","Sunderland","Middlesbrough"], correctAnswer:0, explanation:"Brian Clough managed Derby County from 1967-1973, winning the First Division title, before his disastrous 44-day spell at Leeds.", points:30, timeLimit:20 },
  { id:"h071", difficulty:"hard", category:"TRANSFERS", question:"Who was the world-record transfer before Zidane's 2001 move to Real Madrid?", options:["Luis Figo","Ronaldo (Brazilian)","David Beckham","Edgar Davids"], correctAnswer:0, explanation:"Luis Figo's £37 million move from Barcelona to Real Madrid in 2000 set the world record before Zidane surpassed it in 2001.", points:30, timeLimit:20 },
  { id:"h072", difficulty:"hard", category:"RECORDS", question:"Who holds the record for most World Cup goals (16 goals)?", options:["Gerd Müller","Pelé","Ronaldo","Miroslav Klose"], correctAnswer:3, explanation:"Miroslav Klose of Germany holds the record for most career World Cup goals with 16.", points:30, timeLimit:20 },
  { id:"h073", difficulty:"hard", category:"PLAYERS", question:"Which striker scored 41 Bundesliga goals in 2020/21 to break a 49-year record?", options:["Erling Haaland","Robert Lewandowski","Thomas Müller","Marco Reus"], correctAnswer:1, explanation:"Robert Lewandowski scored 41 Bundesliga goals in 2020/21, surpassing Gerd Müller's 49-year record of 40.", points:30, timeLimit:20 },
  { id:"h074", difficulty:"hard", category:"HISTORY", question:"Who scored the winning goal in the 1999 Champions League final for Manchester United?", options:["Dwight Yorke","Andy Cole","Ole Gunnar Solskjaer","Teddy Sheringham"], correctAnswer:2, explanation:"Ole Gunnar Solskjaer scored the winning goal in injury time against Bayern Munich in the 1999 Champions League final.", points:30, timeLimit:20 },
  { id:"h075", difficulty:"hard", category:"COMPETITIONS", question:"The Women's Champions League final 2022/23 was won by which club?", options:["Chelsea vs Arsenal","Barcelona vs Wolfsburg","Lyon vs Barcelona","Barcelona vs Chelsea"], correctAnswer:1, explanation:"Barcelona won the Women's Champions League 2022/23, defeating Wolfsburg 3-2 in the final.", points:30, timeLimit:20 },
  { id:"h076", difficulty:"hard", category:"MANAGERS", question:"Who was the first manager to win the FA Cup five or more times?", options:["Herbert Chapman","Bill Nicholson","Arsène Wenger","Alex Ferguson"], correctAnswer:2, explanation:"Arsène Wenger won the FA Cup a record seven times as Arsenal manager.", points:30, timeLimit:20 },
  { id:"h077", difficulty:"hard", category:"RECORDS", question:"Ronaldo (Brazilian) won World Cups in which years?", options:["1994 and 2002","1998 and 2006","1994 and 1998","2002 and 2006"], correctAnswer:0, explanation:"Ronaldo Nazário was part of the 1994 squad and was the hero of the 2002 World Cup.", points:30, timeLimit:20 },
  { id:"h078", difficulty:"hard", category:"CLUBS", question:"Atletico Nacional are from which South American city?", options:["Buenos Aires","Santiago","Medellín","Lima"], correctAnswer:2, explanation:"Atletico Nacional are from Medellín, Colombia, and are one of the most successful South American clubs.", points:30, timeLimit:20 },
  { id:"h079", difficulty:"hard", category:"NATIONAL_TEAMS", question:"Which country's team plays in the 'Tri' colours of green, white and red?", options:["Brazil","Portugal","Mexico","Bolivia"], correctAnswer:2, explanation:"Mexico's national team is famously known as 'El Tri' — green, white and red representing their national flag colours.", points:30, timeLimit:20 },
  { id:"h080", difficulty:"hard", category:"PLAYERS", question:"Which goalkeeper is the only one to win the Ballon d'Or (1963)?", options:["Gordon Banks","Peter Schmeichel","Lev Yashin","Gianluigi Buffon"], correctAnswer:2, explanation:"Lev Yashin won the Ballon d'Or in 1963 — the only goalkeeper in history to win the award.", points:30, timeLimit:20 },
  { id:"h081", difficulty:"hard", category:"HISTORY", question:"Who scored the equaliser for Manchester United in the 1999 Champions League final?", options:["Dwight Yorke","Andy Cole","Ole Gunnar Solskjaer","Teddy Sheringham"], correctAnswer:3, explanation:"Teddy Sheringham scored the equaliser to make it 1-1 in injury time before Solskjaer won it.", points:30, timeLimit:20 },
  { id:"h082", difficulty:"hard", category:"COMPETITIONS", question:"How many substitutes can a team use in a standard Premier League match (from 2022)?", options:["3","4","5","6"], correctAnswer:2, explanation:"The Premier League adopted the five-substitutes rule from the 2022/23 season.", points:30, timeLimit:20 },
  { id:"h083", difficulty:"hard", category:"RECORDS", question:"Which club has the most consecutive European Cup / Champions League titles (3 in a row, 2016-2018)?", options:["Bayern Munich","Real Madrid","Barcelona","Liverpool"], correctAnswer:1, explanation:"Real Madrid won three consecutive Champions League titles from 2016 to 2018 under Zinedine Zidane.", points:30, timeLimit:20 },
  { id:"h084", difficulty:"hard", category:"PLAYERS", question:"Who scored the famous volley for Real Madrid in the 2002 Champions League final?", options:["Ronaldo","Roberto Carlos","Zinedine Zidane","Raúl"], correctAnswer:2, explanation:"Zinedine Zidane's left-foot volley in the 2002 Champions League final against Bayer Leverkusen is considered one of the greatest goals ever.", points:30, timeLimit:20 },
  { id:"h085", difficulty:"hard", category:"CLUBS", question:"What year was Manchester United briefly relegated from the English top flight?", options:["1971","1974","1978","1983"], correctAnswer:1, explanation:"Manchester United were relegated from the First Division in 1974, spending one season in the Second Division.", points:30, timeLimit:20 },
  { id:"h086", difficulty:"hard", category:"NATIONAL_TEAMS", question:"How many goals did Germany score against Brazil in the 2014 World Cup semi-final?", options:["5","6","7","8"], correctAnswer:2, explanation:"Germany infamously beat Brazil 7-1 in the 2014 World Cup semi-final in Belo Horizonte — the 'Mineirazo'.", points:30, timeLimit:20 },
  { id:"h087", difficulty:"hard", category:"TRANSFERS", question:"The world record for a goalkeeper was set in 2018 by the transfer of which player?", options:["Alisson Becker","Ederson","Kepa Arrizabalaga","Gianluigi Donnarumma"], correctAnswer:2, explanation:"Kepa Arrizabalaga's £71 million move from Athletic Bilbao to Chelsea in 2018 set the world record for a goalkeeper.", points:30, timeLimit:20 },
  { id:"h088", difficulty:"hard", category:"MANAGERS", question:"Which legendary Liverpool manager won three European Cups?", options:["Kenny Dalglish","Bob Paisley","Bill Shankly","Ron Moran"], correctAnswer:1, explanation:"Bob Paisley won three European Cups with Liverpool (1977, 1978, 1981).", points:30, timeLimit:20 },
  { id:"h089", difficulty:"hard", category:"HISTORY", question:"In which year did Nottingham Forest win their first Division One title before their European Cup runs?", options:["1975","1976","1977","1978"], correctAnswer:3, explanation:"Nottingham Forest won the First Division title in 1977/78, just one year before their first European Cup.", points:30, timeLimit:20 },
  { id:"h090", difficulty:"hard", category:"COMPETITIONS", question:"When was VAR introduced in the Premier League?", options:["2017/18","2018/19","2019/20","2020/21"], correctAnswer:2, explanation:"VAR was introduced in the Premier League in the 2019/20 season.", points:30, timeLimit:20 },
  { id:"h091", difficulty:"hard", category:"RECORDS", question:"What is the record for most goals scored in a single Premier League match?", options:["7","8","9","10"], correctAnswer:2, explanation:"Portsmouth beat Reading 7-4 in 2007, meaning 9 goals were scored in a Premier League match. The record is 9 total goals in a game.", points:30, timeLimit:20 },
  { id:"h092", difficulty:"hard", category:"CLUBS", question:"Which club was known as 'Newton Heath' before changing their name?", options:["Everton","Manchester City","Manchester United","Bolton Wanderers"], correctAnswer:2, explanation:"Manchester United were originally known as Newton Heath LYR Football Club before renaming to Manchester United in 1902.", points:30, timeLimit:20 },
  { id:"h093", difficulty:"hard", category:"PLAYERS", question:"Which Brazilian won the Ballon d'Or in 1997?", options:["Ronaldo","Romário","Rivaldo","Roberto Carlos"], correctAnswer:0, explanation:"Ronaldo (Brazilian) won the Ballon d'Or in both 1997 and 2002.", points:30, timeLimit:20 },
  { id:"h094", difficulty:"hard", category:"NATIONAL_TEAMS", question:"Who scored a hat-trick against Spain for Hungary in a famous 1953 match at Wembley?", options:["Zoltan Czibor","Sandor Kocsis","Ferenc Puskás","Nandor Hidegkuti"], correctAnswer:3, explanation:"Nandor Hidegkuti scored a hat-trick as Hungary beat England 6-3 at Wembley in 1953 — England's first home defeat to overseas opposition.", points:30, timeLimit:20 },
  { id:"h095", difficulty:"hard", category:"HISTORY", question:"Which team beat England 6-3 at Wembley in 1953 — England's first ever home defeat to non-British opposition?", options:["West Germany","Hungary","Austria","Brazil"], correctAnswer:1, explanation:"Hungary's 'Golden Team' beat England 6-3 at Wembley on 25 November 1953 in a landmark match.", points:30, timeLimit:20 },
  { id:"h096", difficulty:"hard", category:"TRANSFERS", question:"Which player moved for £85m from Atletico Madrid to Barcelona in 2019?", options:["Joao Felix","Antoine Griezmann","Thomas Lemar","Saul Niguez"], correctAnswer:1, explanation:"Antoine Griezmann joined Barcelona from Atletico Madrid in 2019 for €120 million (around £107m).", points:30, timeLimit:20 },
  { id:"h097", difficulty:"hard", category:"CLUBS", question:"What year was FC Barcelona officially founded?", options:["1895","1899","1902","1910"], correctAnswer:1, explanation:"FC Barcelona was founded on 29 November 1899 by a group of Swiss, English, and Catalan footballers.", points:30, timeLimit:20 },
  { id:"h098", difficulty:"hard", category:"COMPETITIONS", question:"Which was the first World Cup to feature VAR technology?", options:["2014 Brazil","2018 Russia","2022 Qatar","2010 South Africa"], correctAnswer:1, explanation:"VAR (Video Assistant Referee) was used for the first time at a FIFA World Cup in Russia 2018.", points:30, timeLimit:20 },
  { id:"h099", difficulty:"hard", category:"MANAGERS", question:"Who was the first manager to win league titles in four different countries?", options:["José Mourinho","Pep Guardiola","Carlo Ancelotti","Didier Deschamps"], correctAnswer:1, explanation:"Pep Guardiola won league titles in Spain (Barcelona), Germany (Bayern Munich), and England (Manchester City).", points:30, timeLimit:20 },
  { id:"h100", difficulty:"hard", category:"RECORDS", question:"How many appearances did Ryan Giggs make for Manchester United in all competitions?", options:["820","875","963","1050"], correctAnswer:2, explanation:"Ryan Giggs made 963 appearances for Manchester United in all competitions — a club record.", points:30, timeLimit:20 },
];

// ============================================================
// RANKS DATA
// ============================================================
const RANKS = [
  { id:"world_champion", minPercent:95, title:"⭐ WORLD CHAMPION", subtitle:"Saroj says: You're the GOAT. Messi who?", emoji:"🏆", color:"#FFD700", description:"Perfect knowledge. You probably dreamed about football last night." },
  { id:"ballon_dor", minPercent:85, title:"🥇 Ballon d'Or Winner", subtitle:"You're elite. The committee has voted.", emoji:"🎖️", color:"#FFA500", description:"Outstanding performance. Your football brain is next level." },
  { id:"captain", minPercent:75, title:"🦺 Club Captain", subtitle:"Reliable, experienced, respected in the dressing room.", emoji:"🦺", color:"#4CAF50", description:"You know your football. The gaffer trusts you with the armband." },
  { id:"first_eleven", minPercent:60, title:"📋 First Team Regular", subtitle:"You start every week — manager loves consistency.", emoji:"👟", color:"#2196F3", description:"Solid performer. A few gaps but mostly dependable." },
  { id:"rotation_squad", minPercent:45, title:"🔄 Rotation Player", subtitle:"You play when others are injured. Keep training!", emoji:"🔄", color:"#9C27B0", description:"Some good answers, some puzzling ones. The gaffer keeps you around." },
  { id:"bench_warmer", minPercent:30, title:"🪑 Professional Bench Warmer", subtitle:"You've mastered the art of sitting still in the dugout.", emoji:"🪑", color:"#FF9800", description:"You know the game exists. That's a start. The tracksuit fits well." },
  { id:"youth_team", minPercent:15, title:"🧒 Academy Prospect", subtitle:"Lots of potential. Age 8. Please study harder.", emoji:"🧒", color:"#00BCD4", description:"You're technically still developing. The under-9s coach is proud." },
  { id:"leave_team", minPercent:0, title:"🚪 You've Been Released", subtitle:"Your contract has NOT been renewed. Box cleaned. Goodbye.", emoji:"🚪", color:"#F44336", description:"Saroj is speechless. Even the kit man knew more. Try watching ONE match." },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getQuizQuestions(mode) {
  const pool = mode === 'easy' ? easyQuestions : mode === 'medium' ? mediumQuestions : hardQuestions;
  return shuffleArray(pool).slice(0, 15);
}

function getScorePercentage(score, questions) {
  const maxScore = questions.reduce((s, q) => s + q.points, 0);
  return maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
}

function getRank(percentage) {
  return RANKS.find(r => percentage >= r.minPercent) || RANKS[RANKS.length - 1];
}

function checkAuth() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data.expiresAt > Date.now();
  } catch { return false; }
}

function saveAuth() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ expiresAt: Date.now() + 1000 * 60 * 60 * 3 }));
}

function clearAuth() {
  localStorage.removeItem(SESSION_KEY);
}

// ============================================================
// CSS
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-primary: #050a0e;
    --bg-secondary: #0d1b2a;
    --bg-card: rgba(255,255,255,0.04);
    --bg-card-hover: rgba(255,255,255,0.08);
    --green-electric: #00ff87;
    --green-mid: #00c96b;
    --gold-bright: #ffd700;
    --gold-mid: #ffb800;
    --red-card: #ff3b3b;
    --red-soft: #ff6b6b;
    --text-primary: #f0f4f8;
    --text-secondary: #8899a6;
    --border-subtle: rgba(255,255,255,0.08);
    --border-green: rgba(0,255,135,0.3);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Barlow', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body { background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-secondary); }
  ::-webkit-scrollbar-thumb { background: var(--border-green); border-radius: 3px; }

  @keyframes fadeIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
  @keyframes slideInLeft { from { opacity:0; transform: translateX(-40px); } to { opacity:1; transform: translateX(0); } }
  @keyframes slideInUp { from { opacity:0; transform: translateY(40px); } to { opacity:1; transform: translateY(0); } }
  @keyframes scaleIn { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); } }
  @keyframes countUp { from { opacity:0; transform: scale(0.5); } to { opacity:1; transform: scale(1); } }
  @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-6px)} 20%,40%,60%,80%{transform:translateX(6px)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes tickerScroll { from{transform:translateX(100%)} to{transform:translateX(-100%)} }
  @keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes confettiDrop { 0%{transform:translateY(-100vh) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
  @keyframes correctFlash { 0%{background:rgba(0,255,135,0)} 50%{background:rgba(0,255,135,0.2)} 100%{background:rgba(0,255,135,0.08)} }
  @keyframes wrongFlash { 0%{background:rgba(255,59,59,0)} 50%{background:rgba(255,59,59,0.25)} 100%{background:rgba(255,59,59,0.08)} }
  @keyframes rankReveal { 0%{transform:translateX(100vw) rotate(5deg)} 100%{transform:translateX(0) rotate(0deg)} }
  @keyframes bounceIn { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }

  .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
  .animate-slideInRight { animation: slideInRight 0.5s ease forwards; }
  .animate-slideInLeft { animation: slideInLeft 0.5s ease forwards; }
  .animate-slideInUp { animation: slideInUp 0.6s ease forwards; }
  .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .animate-shake { animation: shake 0.5s ease; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-rankReveal { animation: rankReveal 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .animate-bounceIn { animation: bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }

  .navbar {
    position: fixed; top:0; left:0; right:0; z-index:100;
    padding: 0 24px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(5,10,14,0.95);
    border-bottom: 1px solid var(--border-subtle);
    backdrop-filter: blur(20px);
  }
  .navbar-logo { font-family: var(--font-display); font-size: 22px; color: var(--green-electric); letter-spacing: 1px; cursor: pointer; }
  .navbar-logo span { color: var(--gold-bright); }
  .nav-actions { display:flex; gap:12px; align-items:center; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 22px; border-radius: 8px; border: none;
    font-family: var(--font-body); font-weight: 600; font-size: 14px;
    cursor: pointer; transition: all 0.2s ease; text-decoration: none;
  }
  .btn-primary { background: linear-gradient(135deg, var(--green-electric), var(--green-mid)); color: #050a0e; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,255,135,0.3); }
  .btn-secondary { background: transparent; color: var(--text-primary); border: 1px solid var(--border-subtle); }
  .btn-secondary:hover { border-color: var(--border-green); background: var(--bg-card-hover); }
  .btn-gold { background: linear-gradient(135deg, var(--gold-bright), var(--gold-mid)); color: #050a0e; }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,215,0,0.3); }
  .btn-danger { background: var(--red-card); color: white; }
  .btn-danger:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-lg { padding: 14px 32px; font-size: 16px; border-radius: 10px; }
  .btn:disabled { opacity:0.4; cursor:not-allowed; transform:none !important; }

  .card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; backdrop-filter: blur(16px); padding: 24px; }
  .card-glow { border-color: var(--border-green); box-shadow: 0 0 20px rgba(0,255,135,0.08); }
  .glass { background: rgba(13,27,42,0.8); backdrop-filter: blur(20px); border: 1px solid var(--border-subtle); border-radius: 20px; }

  .progress-track { width:100%; height:6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--green-electric), var(--green-mid)); transition: width 0.4s ease; }

  .timer-ring { position: relative; display: inline-flex; }
  .timer-ring svg { transform: rotate(-90deg); }
  .timer-text { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family: var(--font-mono); font-weight: 700; font-size: 20px; }

  .answer-btn {
    width:100%; padding: 16px 20px; border-radius: 12px;
    display: flex; align-items:center; gap: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    cursor:pointer; transition: all 0.2s ease;
    text-align: left; color: var(--text-primary);
    font-family: var(--font-body); font-size: 15px; font-weight: 500;
  }
  .answer-btn:hover:not(:disabled) { border-color: var(--border-green); background: rgba(0,255,135,0.05); transform: translateX(4px); }
  .answer-btn:disabled { cursor: default; }
  .answer-btn.selected { border-color: rgba(33,150,243,0.7); background: rgba(33,150,243,0.1); }
  .answer-btn.correct { border-color: var(--green-electric); background: rgba(0,255,135,0.12); animation: correctFlash 0.5s ease; }
  .answer-btn.wrong { border-color: var(--red-card); background: rgba(255,59,59,0.1); animation: wrongFlash 0.5s ease; }
  .answer-key {
    width: 36px; height: 36px; border-radius: 8px; flex-shrink:0;
    display: flex; align-items: center; justify-content:center;
    background: rgba(255,255,255,0.08);
    font-family: var(--font-display); font-size: 18px; font-weight: 700;
    transition: all 0.2s;
  }
  .answer-btn.correct .answer-key { background: var(--green-electric); color: #050a0e; }
  .answer-btn.wrong .answer-key { background: var(--red-card); color: white; }

  .page { min-height: 100vh; padding-top: 64px; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  .hero {
    min-height: calc(100vh - 64px);
    display: flex; flex-direction:column; justify-content: center; align-items:center;
    text-align:center; padding: 48px 24px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 20% 50%, rgba(0,255,135,0.04) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(255,215,0,0.04) 0%, transparent 50%);
    pointer-events:none;
  }
  .hero-title { font-family: var(--font-display); font-size: clamp(56px, 10vw, 120px); line-height: 0.9; letter-spacing: 2px; color: var(--text-primary); }
  .hero-title .accent { color: var(--green-electric); }
  .hero-subtitle { font-size: 18px; color: var(--text-secondary); margin: 20px 0 32px; max-width: 500px; }

  .ticker-wrap { overflow:hidden; width:100%; background: rgba(0,255,135,0.05); border-top:1px solid var(--border-green); border-bottom:1px solid var(--border-green); padding: 10px 0; }
  .ticker { display: flex; white-space: nowrap; animation: tickerScroll 30s linear infinite; }
  .ticker-item { padding: 0 40px; color: var(--text-secondary); font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .ticker-item .dot { color: var(--green-electric); margin: 0 16px; }

  .mode-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 32px 28px; cursor: pointer; transition: all 0.3s ease; text-align:center; }
  .mode-card:hover { border-color: var(--border-green); transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,255,135,0.1); }
  .mode-card.easy:hover { border-color: rgba(0,255,135,0.6); }
  .mode-card.medium:hover { border-color: rgba(255,180,0,0.6); box-shadow: 0 20px 40px rgba(255,180,0,0.1); }
  .mode-card.hard:hover { border-color: rgba(255,59,59,0.6); box-shadow: 0 20px 40px rgba(255,59,59,0.1); }
  .mode-icon { font-size: 52px; margin-bottom: 16px; display:block; }
  .mode-title { font-family: var(--font-display); font-size: 42px; letter-spacing: 2px; margin-bottom: 8px; }
  .mode-card.easy .mode-title { color: var(--green-electric); }
  .mode-card.medium .mode-title { color: var(--gold-bright); }
  .mode-card.hard .mode-title { color: var(--red-soft); }
  .mode-desc { color: var(--text-secondary); font-size: 14px; line-height: 1.5; }
  .mode-meta { display:flex; gap:12px; justify-content:center; margin-top: 16px; flex-wrap:wrap; }
  .mode-badge { padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.06); }

  .quiz-container { max-width: 780px; margin: 0 auto; padding: 24px; }
  .quiz-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 20px; gap: 16px; flex-wrap: wrap; }
  .quiz-score { font-family: var(--font-mono); font-size: 20px; font-weight: 700; color: var(--gold-bright); }
  .question-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 32px; margin-bottom: 20px; }
  .question-number { font-size: 12px; font-weight: 700; color: var(--green-electric); letter-spacing: 2px; text-transform:uppercase; margin-bottom: 16px; }
  .question-text { font-size: 20px; font-weight: 600; line-height: 1.5; color: var(--text-primary); margin-bottom: 24px; }
  .answers-grid { display:flex; flex-direction:column; gap: 12px; }
  .explanation-box { margin-top: 20px; padding: 16px; background: rgba(0,255,135,0.05); border: 1px solid rgba(0,255,135,0.2); border-radius: 12px; font-size: 14px; color: var(--text-secondary); animation: fadeIn 0.4s ease; }
  .category-badge { display: inline-flex; align-items:center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background: rgba(255,255,255,0.06); color: var(--text-secondary); margin-bottom: 8px; }

  .lifelines { display:flex; gap: 12px; justify-content:center; margin: 16px 0; flex-wrap:wrap; }
  .lifeline-btn { padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.04); cursor:pointer; transition: all 0.2s; color: var(--text-primary); font-size: 13px; font-weight: 600; display:flex; align-items:center; gap: 6px; font-family: var(--font-body); }
  .lifeline-btn:hover:not(:disabled) { border-color: var(--border-green); background: rgba(0,255,135,0.06); }
  .lifeline-btn:disabled { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; }

  .quiz-footer { display:flex; justify-content:space-between; align-items:center; margin-top:20px; }
  .streak-badge { padding: 6px 14px; border-radius: 999px; background: rgba(255,180,0,0.1); border: 1px solid rgba(255,180,0,0.3); color: var(--gold-bright); font-weight: 700; font-size: 14px; display:inline-flex; align-items:center; gap: 6px; }

  .result-page { min-height: calc(100vh - 64px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 32px 24px; }
  .score-display { font-family: var(--font-mono); font-size: clamp(64px, 12vw, 96px); font-weight: 700; color: var(--gold-bright); line-height:1; animation: countUp 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .rank-title { font-family: var(--font-display); font-size: clamp(28px, 5vw, 52px); letter-spacing: 2px; margin: 8px 0; animation: rankReveal 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }
  .rank-subtitle { color: var(--text-secondary); font-size: 16px; animation: fadeIn 0.6s ease 1.2s both; }
  .stats-row { display:flex; gap: 24px; margin: 24px 0; flex-wrap:wrap; justify-content:center; }
  .stat-item { text-align:center; padding: 20px 28px; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle); min-width: 100px; }
  .stat-value { font-family: var(--font-mono); font-size: 32px; font-weight: 700; }
  .stat-label { font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

  .review-item { padding: 16px; border-bottom: 1px solid var(--border-subtle); }
  .review-item:last-child { border-bottom: none; }
  .review-answer { font-size: 13px; margin: 4px 0; }
  .review-answer.correct { color: var(--green-electric); }
  .review-answer.wrong { color: var(--red-soft); }
  .review-answer.correct-marker { color: var(--green-electric); }

  .login-page { min-height: calc(100vh - 64px); display:flex; align-items:center; justify-content:center; padding: 32px 24px; }
  .login-card { width:100%; max-width: 440px; }
  .input-group { position: relative; margin-bottom: 16px; }
  .input-prefix { position:absolute; left: 14px; top:50%; transform:translateY(-50%); font-size: 20px; }
  .input-field { width:100%; padding: 14px 14px 14px 48px; background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 10px; color: var(--text-primary); font-family: var(--font-body); font-size: 15px; transition: all 0.2s; outline: none; }
  .input-field:focus { border-color: var(--border-green); box-shadow: 0 0 0 3px rgba(0,255,135,0.1); }
  .input-field::placeholder { color: var(--text-secondary); }
  .error-msg { color: var(--red-soft); font-size: 13px; font-weight: 600; padding: 10px 14px; background: rgba(255,59,59,0.08); border: 1px solid rgba(255,59,59,0.2); border-radius: 8px; margin-bottom: 12px; }

  .lb-row { display:flex; align-items:center; gap: 16px; padding: 16px; border-bottom: 1px solid var(--border-subtle); transition: background 0.2s; }
  .lb-row:hover { background: var(--bg-card-hover); }
  .lb-rank-num { font-family: var(--font-mono); font-size: 18px; font-weight: 700; width: 32px; flex-shrink:0; color: var(--text-secondary); }
  .lb-rank-num.gold { color: var(--gold-bright); }
  .lb-rank-num.silver { color: #C0C0C0; }
  .lb-rank-num.bronze { color: #CD7F32; }
  .lb-info { flex:1; }
  .lb-score { font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: var(--green-electric); }
  .lb-time { font-size: 12px; color: var(--text-secondary); }

  .confetti-piece { position:fixed; pointer-events:none; animation: confettiDrop 4s ease-in forwards; border-radius: 3px; z-index: 9999; }

  .step { display:flex; gap: 20px; align-items:flex-start; }
  .step-num { width:40px; height:40px; border-radius:50%; background: linear-gradient(135deg, var(--green-electric), var(--green-mid)); display:flex; align-items:center; justify-content:center; font-weight:800; color:#050a0e; flex-shrink:0; }

  .section { padding: 80px 0; }
  .section-title { font-family: var(--font-display); font-size: clamp(32px, 5vw, 52px); letter-spacing: 2px; text-align:center; margin-bottom: 48px; }
  .section-title .accent { color: var(--green-electric); }

  .modal-overlay { position:fixed; inset:0; background: rgba(0,0,0,0.7); z-index:200; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(4px); }
  .modal { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 36px; max-width: 420px; width:90%; animation: scaleIn 0.3s ease; }
  .modal h3 { font-family: var(--font-display); font-size: 28px; letter-spacing: 1px; margin-bottom: 12px; }
  .modal p { color: var(--text-secondary); margin-bottom: 24px; }
  .modal-actions { display:flex; gap: 12px; justify-content:flex-end; }

  .grid-2 { display:grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .grid-3 { display:grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .tabs { display:flex; gap: 4px; background: rgba(255,255,255,0.04); border-radius: 10px; padding: 4px; width:fit-content; margin-bottom: 24px; }
  .tab { padding: 8px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor:pointer; transition: all 0.2s; color: var(--text-secondary); border:none; background:transparent; font-family: var(--font-body); }
  .tab.active { background: rgba(0,255,135,0.1); color: var(--green-electric); border: 1px solid rgba(0,255,135,0.2); }

  .fun-fact { padding: 20px 24px; background: rgba(255,215,0,0.05); border: 1px solid rgba(255,215,0,0.15); border-radius: 14px; font-size: 15px; color: var(--text-primary); line-height: 1.6; }
  .fun-fact .label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--gold-mid); font-weight: 700; margin-bottom: 8px; }

  .stadium-bg {
    background:
      radial-gradient(ellipse at 15% 85%, rgba(0,255,135,0.04) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 15%, rgba(255,215,0,0.04) 0%, transparent 45%),
      var(--bg-primary);
  }

  .tag { display:inline-flex; align-items:center; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .tag-easy { background: rgba(0,255,135,0.15); color: var(--green-electric); }
  .tag-medium { background: rgba(255,215,0,0.15); color: var(--gold-bright); }
  .tag-hard { background: rgba(255,59,59,0.15); color: var(--red-soft); }

  @media (max-width: 640px) {
    .grid-3 { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
    .stats-row { gap: 12px; }
    .stat-item { padding: 14px 16px; min-width: 80px; }
    .quiz-header { flex-direction: column; align-items: flex-start; }
    .hero-title { font-size: 48px; }
    .question-text { font-size: 17px; }
    .answer-btn { font-size: 14px; padding: 12px 14px; }
    .lifelines { gap: 8px; }
    .lifeline-btn { padding: 6px 10px; font-size: 12px; }
  }
  @media (max-width: 480px) {
    .navbar { padding: 0 16px; }
    .navbar-logo { font-size: 18px; }
  }
`;

// ============================================================
// CONFETTI COMPONENT
// ============================================================
function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    width: Math.random() * 8 + 6 + 'px',
    height: Math.random() * 8 + 4 + 'px',
    color: ['#FFD700', '#00ff87', '#FF6B6B', '#4FC3F7', '#CE93D8', '#FFCC02'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 3 + 's',
    duration: Math.random() * 2 + 3 + 's',
  }));
  return (
    <div style={{ pointerEvents: 'none' }}>
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{ left: p.left, top: '-20px', width: p.width, height: p.height, background: p.color, animationDelay: p.delay, animationDuration: p.duration }} />
      ))}
    </div>
  );
}

// ============================================================
// TIMER COMPONENT
// ============================================================
function TimerRing({ seconds, maxSeconds, size = 70 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = seconds / maxSeconds;
  const strokeDashoffset = circumference * (1 - fraction);
  const color = seconds > maxSeconds * 0.5 ? '#00ff87' : seconds > maxSeconds * 0.25 ? '#FFD700' : '#ff3b3b';
  const isLow = seconds <= 5;
  return (
    <div className="timer-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }} />
      </svg>
      <div className="timer-text" style={{ color, animation: isLow ? 'timerPulse 1s ease infinite' : 'none' }}>
        {seconds}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState('home');
  const [isAuth, setIsAuth] = useState(() => checkAuth());
  const [quizMode, setQuizMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [quizStatus, setQuizStatus] = useState('idle');
  const [lifelines, setLifelines] = useState({ fiftyFifty: true, skip: true, extraTime: true });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [lbTab, setLbTab] = useState('easy');
  const [leaderboard, setLeaderboard] = useState({ easy: [], medium: [], hard: [] });
  const [loginError, setLoginError] = useState('');
  const [loginShake, setLoginShake] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [funFact, setFunFact] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const timerRef = useRef(null);

  const funFacts = [
    "The first World Cup was held in Uruguay in 1930 with only 13 teams.",
    "Real Madrid have won the Champions League a record 15 times.",
    "Pele won three World Cups with Brazil in 1958, 1962 and 1970.",
    "The fastest red card in history was shown after just 2 seconds.",
    "Just Fontaine scored 13 World Cup goals in 1958 — a record that still stands.",
    "Neymar's 222m euro transfer to PSG in 2017 remains the world record.",
    "Messi has won the Ballon d'Or a record 8 times.",
    "Erling Haaland scored 36 Premier League goals in his debut season — a record.",
    "Brazil is the only nation to have played in every World Cup.",
    "The first international was England vs Scotland in 1872, ending 0-0.",
    "Ronaldo has scored 800+ career goals across club and international football.",
    "The Maracana stadium held nearly 200,000 fans for the 1950 World Cup final.",
    "Thierry Henry remains Arsenal's all-time top scorer with 228 goals.",
    "Bayern Munich went unbeaten in the entire 2019/20 Champions League.",
    "Germany beat Brazil 7-1 in the 2014 World Cup semi-final in Belo Horizonte.",
  ];

  useEffect(() => {
    const random = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFunFact(random);
    const interval = setInterval(() => {
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  useEffect(() => {
    loadLeaderboard();
  }, []);

  function loadLeaderboard() {
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (raw) setLeaderboard(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load leaderboard', e);
    }
  }

  function saveToLeaderboard(mode, scoreVal, percentage, rankTitle, correct, total, timeTaken) {
    const entry = {
      sessionId: Date.now().toString(),
      mode, score: scoreVal, percentage, rank: rankTitle,
      correctAnswers: correct, totalQuestions: total, timeTaken,
      timestamp: Date.now(),
    };
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      const lb = raw ? JSON.parse(raw) : { easy: [], medium: [], hard: [] };
      if (!lb[mode]) lb[mode] = [];
      lb[mode] = [...lb[mode], entry].sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb));
      setLeaderboard({ ...lb });
    } catch (e) {
      console.error('Failed to save leaderboard', e);
    }
  }

  // Timer effect
  useEffect(() => {
    if (quizStatus !== 'playing' || revealed) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimerSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [quizStatus, revealed, currentIdx]); // eslint-disable-line

  function handleTimeUp() {
    setAnswers(prev => { const a = [...prev]; a[currentIdx] = null; return a; });
    setRevealed(true);
    setStreak(0);
  }

  function startQuiz(mode) {
    const qs = getQuizQuestions(mode);
    setQuizMode(mode);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers(new Array(15).fill(undefined));
    setScore(0);
    setSelected(null);
    setRevealed(false);
    setTimerSeconds(qs[0].timeLimit);
    setQuizStatus('playing');
    setLifelines({ fiftyFifty: true, skip: true, extraTime: true });
    setEliminatedOptions([]);
    setStreak(0);
    setBestStreak(0);
    setShowConfetti(false);
    setShowReview(false);
    setQuestionStartTime(Date.now());
    setQuizStartTime(Date.now());
    setPage('quiz');
  }

  function selectAnswer(idx) {
    if (revealed || selected !== null) return;
    if (eliminatedOptions.includes(idx)) return;
    clearInterval(timerRef.current);
    const q = questions[currentIdx];
    const isCorrect = idx === q.correctAnswer;
    setSelected(idx);
    setRevealed(true);

    if (isCorrect) {
      const timeSpent = questionStartTime ? (Date.now() - questionStartTime) / 1000 : 999;
      let pts = q.points;
      if (timeSpent < 10) pts += Math.floor(q.points / 2);
      setScore(prev => prev + pts);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setStreak(0);
    }
    setAnswers(prev => { const a = [...prev]; a[currentIdx] = idx; return a; });
  }

  function nextQuestion() {
    if (currentIdx >= questions.length - 1) {
      finishQuiz();
      return;
    }
    const nextIdx = currentIdx + 1;
    setCurrentIdx(nextIdx);
    setSelected(null);
    setRevealed(false);
    setTimerSeconds(questions[nextIdx].timeLimit);
    setEliminatedOptions([]);
    setQuestionStartTime(Date.now());
  }

  function finishQuiz() {
    clearInterval(timerRef.current);
    setQuizStatus('finished');
    // Use functional update to get latest score
    setScore(currentScore => {
      const finalAnswers = answers;
      const percentage = getScorePercentage(currentScore, questions);
      const rank = getRank(percentage);
      const correct = finalAnswers.filter((a, i) => questions[i] && a === questions[i].correctAnswer).length;
      const timeTaken = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0;
      if (percentage >= 75) setShowConfetti(true);
      saveToLeaderboard(quizMode, currentScore, percentage, rank.title, correct, 15, timeTaken);
      return currentScore;
    });
    setPage('result');
  }

  function useFiftyFifty() {
    if (!lifelines.fiftyFifty || revealed) return;
    const q = questions[currentIdx];
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correctAnswer);
    const toEliminate = shuffleArray(wrongIndices).slice(0, 2);
    setEliminatedOptions(toEliminate);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  }

  function useSkip() {
    if (!lifelines.skip || revealed) return;
    clearInterval(timerRef.current);
    setAnswers(prev => { const a = [...prev]; a[currentIdx] = null; return a; });
    setRevealed(true);
    setStreak(0);
    setLifelines(prev => ({ ...prev, skip: false }));
  }

  function useExtraTime() {
    if (!lifelines.extraTime || revealed) return;
    setTimerSeconds(prev => prev + 15);
    setLifelines(prev => ({ ...prev, extraTime: false }));
  }

  function doLogin() {
    if (loginId.trim() === AUTH_CREDENTIALS.id && loginPass === AUTH_CREDENTIALS.password) {
      saveAuth();
      setIsAuth(true);
      setLoginError('');
      setLoginId('');
      setLoginPass('');
      setPage('quiz-select');
    } else {
      setLoginError('Red Card! Wrong credentials. Try again!');
      setLoginShake(true);
      setTimeout(() => setLoginShake(false), 600);
    }
  }

  function doLogout() {
    clearAuth();
    setIsAuth(false);
    setPage('home');
  }

  function goToQuiz() {
    if (isAuth) setPage('quiz-select');
    else setPage('login');
  }

  const q = questions[currentIdx];
  const percentage = questions.length > 0 ? getScorePercentage(score, questions) : 0;
  const rank = questions.length > 0 ? getRank(percentage) : null;
  const correctCount = answers.filter((a, i) => questions[i] && a === questions[i].correctAnswer).length;
  const wrongCount = answers.filter((a, i) => questions[i] && a !== undefined && a !== null && a !== questions[i].correctAnswer).length;
  const skippedCount = answers.filter(a => a === null).length;

  return (
    <>
      <style>{css}</style>
      {showConfetti && <Confetti />}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setPage('home')}>
          Football Quiz <span>With Saroj</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-secondary" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={() => setPage('leaderboard')}>
            🏆 Board
          </button>
          {isAuth ? (
            <>
              <button className="btn btn-secondary" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={goToQuiz}>Play</button>
              <button className="btn btn-danger" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={doLogout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-primary" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={() => setPage('login')}>Login</button>
          )}
        </div>
      </nav>

      {/* QUIT MODAL */}
      {showQuitModal && (
        <div className="modal-overlay" onClick={() => setShowQuitModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Leave the Pitch?</h3>
            <p>Your progress will be lost. The gaffer will be disappointed.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowQuitModal(false)}>Stay On</button>
              <button className="btn btn-danger" onClick={() => { setShowQuitModal(false); clearInterval(timerRef.current); setPage('home'); setQuizStatus('idle'); }}>Walk Out</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== HOME PAGE ==================== */}
      {page === 'home' && (
        <div className="page stadium-bg">
          <section className="hero">
            <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green-electric)', marginBottom: '16px' }}>
                The Ultimate Football Quiz
              </p>
            </div>
            <h1 className="hero-title animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              FOOTBALL QUIZ<br /><span className="accent">WITH SAROJ</span>
            </h1>
            <p className="hero-subtitle animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              500 questions. 3 difficulty modes. 8 legendary ranks. How much do you really know about the beautiful game?
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeIn 0.6s ease 0.6s both' }}>
              <button className="btn btn-primary btn-lg" onClick={goToQuiz}>
                Start Quiz
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => setPage('leaderboard')}>
                🏆 Leaderboard
              </button>
            </div>
            <div className="fun-fact animate-fadeIn" style={{ maxWidth: '600px', marginTop: '48px', animationDelay: '0.8s' }}>
              <div className="label">Fun Fact</div>
              {funFact}
            </div>
          </section>

          {/* TICKER */}
          <div className="ticker-wrap">
            <div className="ticker">
              {['500 Questions', '3 Difficulty Modes', '8 Unique Ranks', 'Timed Challenges', 'Streak Bonuses', 'Lifelines Available'].map((t, i) => (
                <span key={i} className="ticker-item">{t}<span className="dot">•</span></span>
              ))}
              {['500 Questions', '3 Difficulty Modes', '8 Unique Ranks', 'Timed Challenges', 'Streak Bonuses', 'Lifelines Available'].map((t, i) => (
                <span key={`b${i}`} className="ticker-item">{t}<span className="dot">•</span></span>
              ))}
            </div>
          </div>

          {/* MODES PREVIEW */}
          <section className="section">
            <div className="container">
              <h2 className="section-title">CHOOSE YOUR <span className="accent">BATTLE</span></h2>
              <div className="grid-3">
                {[
                  { mode: 'easy', icon: '🟢', pts: '10', time: '30s', desc: 'Perfect for warming up. Classic questions about clubs, players and competitions.' },
                  { mode: 'medium', icon: '🟡', pts: '20', time: '25s', desc: 'The real test begins. Records, managers, history, and deeper facts.' },
                  { mode: 'hard', icon: '🔴', pts: '30', time: '20s', desc: 'Elite-level knowledge only. Are you brave enough?' },
                ].map(({ mode, icon, pts, time, desc }) => (
                  <div key={mode} className={`mode-card ${mode} animate-fadeIn`} onClick={goToQuiz}>
                    <span className="mode-icon">{icon}</span>
                    <div className="mode-title">{mode.toUpperCase()}</div>
                    <p className="mode-desc">{desc}</p>
                    <div className="mode-meta">
                      <span className="mode-badge">15 Questions</span>
                      <span className="mode-badge">{time}/Q</span>
                      <span className="mode-badge">{pts} pts/Q</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <h2 className="section-title">HOW IT <span className="accent">WORKS</span></h2>
              <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { n: '1', t: 'Login', d: 'Use your quiz credentials to access the game.' },
                  { n: '2', t: 'Choose Mode', d: 'Pick Easy, Medium, or Hard based on your confidence.' },
                  { n: '3', t: 'Answer 15 Questions', d: 'Race against the clock. Use lifelines wisely.' },
                  { n: '4', t: 'See Your Rank', d: "From World Champion to 'You've Been Released'. Where will you land?" },
                ].map(step => (
                  <div key={step.n} className="step animate-fadeIn">
                    <div className="step-num">{step.n}</div>
                    <div>
                      <div style={{ fontWeight: '700', marginBottom: '4px' }}>{step.t}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RANKS */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <h2 className="section-title">THE <span className="accent">8 RANKS</span></h2>
              <div className="grid-2" style={{ gap: '12px' }}>
                {RANKS.map((r, i) => (
                  <div key={r.id} className="card animate-fadeIn" style={{ animationDelay: `${i * 0.07}s`, borderColor: r.color + '30' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{r.emoji}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: r.color, letterSpacing: '1px' }}>{r.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.minPercent}%+</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--green-electric)', marginBottom: '8px' }}>FOOTBALL QUIZ WITH SAROJ</p>
            <p>500 Questions — 3 Modes — 8 Ranks — Built with love for Football</p>
            <p style={{ marginTop: '8px', opacity: 0.5 }}>Login: ID: FTQuiz@Saroj | Password: TimetoPlay</p>
          </footer>
        </div>
      )}

      {/* ==================== LOGIN PAGE ==================== */}
      {page === 'login' && (
        <div className="page login-page">
          <div className={`login-card card card-glow animate-scaleIn ${loginShake ? 'animate-shake' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '52px', marginBottom: '12px' }}>⚽</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', letterSpacing: '2px', color: 'var(--green-electric)' }}>FOOTBALL QUIZ</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>WITH SAROJ</p>
            </div>
            {loginError && <div className="error-msg">{loginError}</div>}
            <div className="input-group">
              <span className="input-prefix">🎫</span>
              <input className="input-field" type="text" placeholder="Quiz ID" value={loginId} onChange={e => setLoginId(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} autoComplete="username" />
            </div>
            <div className="input-group">
              <span className="input-prefix">🔒</span>
              <input className="input-field" type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} autoComplete="current-password" />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '4px', fontSize: '15px' }} onClick={doLogin}>
              Kick Off!
            </button>
            <p style={{ textAlign: 'center', marginTop: '16px' }}>
              <button className="btn btn-secondary" style={{ fontSize: '13px', padding: '6px 14px' }} onClick={() => setPage('home')}>Back to Home</button>
            </p>
          </div>
        </div>
      )}

      {/* ==================== QUIZ SELECT ==================== */}
      {page === 'quiz-select' && (
        <div className="page stadium-bg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
          <h1 className="section-title animate-fadeIn" style={{ marginBottom: '12px' }}>CHOOSE YOUR <span className="accent">MODE</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center', animation: 'fadeIn 0.5s ease 0.2s both' }}>15 random questions. Every session is unique.</p>
          <div className="grid-3 animate-fadeIn" style={{ maxWidth: '900px', width: '100%', animationDelay: '0.3s' }}>
            {[
              { mode: 'easy', icon: '🟢', color: 'var(--green-electric)', pts: '10', time: '30s', title: 'EASY', desc: 'For the casual fan' },
              { mode: 'medium', icon: '🟡', color: 'var(--gold-bright)', pts: '20', time: '25s', title: 'MEDIUM', desc: 'For the true follower' },
              { mode: 'hard', icon: '🔴', color: 'var(--red-soft)', pts: '30', time: '20s', title: 'HARD', desc: 'For the football obsessive' },
            ].map(({ mode, icon, color, pts, time, title, desc }) => (
              <div key={mode} className={`mode-card ${mode}`} onClick={() => startQuiz(mode)}>
                <span className="mode-icon">{icon}</span>
                <div className="mode-title" style={{ color }}>{title}</div>
                <p className="mode-desc">{desc}</p>
                <div className="mode-meta">
                  <span className="mode-badge">{time}</span>
                  <span className="mode-badge">{pts}pts</span>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                  Play Now
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" style={{ marginTop: '32px' }} onClick={() => setPage('home')}>Back to Home</button>
        </div>
      )}

      {/* ==================== QUIZ PAGE ==================== */}
      {page === 'quiz' && q && (
        <div className="page">
          <div className="quiz-container">
            {/* Header */}
            <div className="quiz-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span className={`tag tag-${quizMode}`}>{quizMode ? quizMode.toUpperCase() : ''}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Question {currentIdx + 1} / 15</span>
                {streak >= 2 && <span className="streak-badge">🔥 {streak} streak!</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="quiz-score">💎 {score}</div>
                <TimerRing seconds={timerSeconds} maxSeconds={q.timeLimit} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-track" style={{ marginBottom: '20px' }}>
              <div className="progress-fill" style={{ width: `${((currentIdx + (revealed ? 1 : 0)) / 15) * 100}%` }} />
            </div>

            {/* Question Card */}
            <div className="question-card animate-fadeIn" key={`q-${currentIdx}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="category-badge">{q.category.replace(/_/g, ' ')}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {q.difficulty.toUpperCase()} • {q.points}pts
                </span>
              </div>
              <div className="question-text">{q.question}</div>

              {/* Answer Buttons */}
              <div className="answers-grid">
                {q.options.map((opt, i) => {
                  const isEliminated = eliminatedOptions.includes(i);
                  const isCorrectOpt = i === q.correctAnswer;
                  let cls = 'answer-btn';
                  if (revealed) {
                    if (isCorrectOpt) cls += ' correct';
                    else if (selected === i && !isCorrectOpt) cls += ' wrong';
                  } else if (selected === i) {
                    cls += ' selected';
                  }
                  return (
                    <button
                      key={i}
                      className={cls}
                      disabled={revealed || isEliminated}
                      onClick={() => selectAnswer(i)}
                      style={isEliminated ? { opacity: 0.2, cursor: 'not-allowed', pointerEvents: 'none' } : {}}
                    >
                      <span className="answer-key">
                        {revealed && isCorrectOpt ? '✓' : revealed && selected === i && !isCorrectOpt ? '✗' : ['A', 'B', 'C', 'D'][i]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed && (
                <div className="explanation-box">
                  <strong style={{ color: 'var(--green-electric)' }}>Did you know?</strong>
                  <p style={{ marginTop: '6px', lineHeight: '1.5' }}>{q.explanation}</p>
                </div>
              )}
            </div>

            {/* Lifelines */}
            <div className="lifelines">
              <button className="lifeline-btn" disabled={!lifelines.fiftyFifty || revealed} onClick={useFiftyFifty}>
                ✂️ 50/50
              </button>
              <button className="lifeline-btn" disabled={!lifelines.skip || revealed} onClick={useSkip}>
                ⏭️ Skip
              </button>
              <button className="lifeline-btn" disabled={!lifelines.extraTime || revealed} onClick={useExtraTime}>
                ⏱️ +15s
              </button>
            </div>

            {/* Footer */}
            <div className="quiz-footer">
              <button className="btn btn-secondary" onClick={() => setShowQuitModal(true)}>Quit</button>
              {revealed && (
                <button className="btn btn-primary animate-fadeIn" onClick={() => {
                  if (currentIdx >= 14) finishQuiz();
                  else nextQuestion();
                }}>
                  {currentIdx >= 14 ? 'See Results' : 'Next'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== RESULT PAGE ==================== */}
      {page === 'result' && (
        <div className="page result-page">
          <div style={{ maxWidth: '680px', width: '100%' }}>
            <div className="card card-glow animate-fadeIn" style={{ textAlign: 'center', borderColor: rank ? rank.color + '40' : undefined, marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                {quizMode ? quizMode.toUpperCase() : ''} MODE
              </p>
              <div className="score-display">{score}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>Final Score</p>
              {rank && (
                <>
                  <div className="rank-title" style={{ color: rank.color }}>{rank.title}</div>
                  <p className="rank-subtitle">{rank.subtitle}</p>
                  <p style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>{rank.description}</p>
                </>
              )}
            </div>

            <div className="stats-row animate-slideInUp" style={{ animationDelay: '0.8s' }}>
              <div className="stat-item">
                <div className="stat-value" style={{ color: 'var(--green-electric)' }}>{correctCount}</div>
                <div className="stat-label">Correct</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: 'var(--red-soft)' }}>{wrongCount}</div>
                <div className="stat-label">Wrong</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: 'var(--text-secondary)' }}>{skippedCount}</div>
                <div className="stat-label">Skipped</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: 'var(--gold-bright)' }}>{percentage}%</div>
                <div className="stat-label">Score %</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: 'var(--gold-mid)' }}>{bestStreak}</div>
                <div className="stat-label">Best Streak</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', margin: '24px 0', animation: 'fadeIn 0.5s ease 1.5s both' }}>
              <button className="btn btn-primary btn-lg" onClick={() => startQuiz(quizMode)}>Play Again</button>
              <button className="btn btn-gold btn-lg" onClick={() => setPage('quiz-select')}>Change Mode</button>
              <button className="btn btn-secondary btn-lg" onClick={() => setShowReview(!showReview)}>
                {showReview ? 'Hide Review' : 'Review Answers'}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setShowConfetti(false); setPage('home'); }}>Home</button>
            </div>

            {showReview && (
              <div className="card animate-slideInUp">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', letterSpacing: '1px', marginBottom: '16px', color: 'var(--green-electric)' }}>ANSWER REVIEW</h3>
                {questions.map((ques, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === ques.correctAnswer;
                  const isSkipped = userAns === null || userAns === undefined;
                  return (
                    <div key={ques.id} className="review-item">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                        <span>{isCorrect ? '✅' : isSkipped ? '⏭️' : '❌'}</span>
                        <span style={{ fontWeight: '600', fontSize: '14px', flex: 1 }}>{ques.question}</span>
                        <span className={`tag tag-${ques.difficulty}`}>{ques.category}</span>
                      </div>
                      {!isSkipped && !isCorrect && (
                        <div className="review-answer wrong">Your answer: {ques.options[userAns]}</div>
                      )}
                      {isCorrect && (
                        <div className="review-answer correct">Your answer: {ques.options[userAns]} ✓</div>
                      )}
                      {!isCorrect && (
                        <div className="review-answer correct-marker">Correct: {ques.options[ques.correctAnswer]}</div>
                      )}
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{ques.explanation}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== LEADERBOARD ==================== */}
      {page === 'leaderboard' && (
        <div className="page">
          <div className="container" style={{ padding: '80px 24px 40px' }}>
            <h1 className="section-title animate-fadeIn">🏆 LEADERBOARD</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '36px', animation: 'fadeIn 0.5s ease 0.2s both' }}>
              Top 10 scores per mode. Can you beat the best?
            </p>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div className="tabs">
                {['easy', 'medium', 'hard'].map(m => (
                  <button key={m} className={`tab ${lbTab === m ? 'active' : ''}`} onClick={() => setLbTab(m)}>
                    {m === 'easy' ? '🟢 Easy' : m === 'medium' ? '🟡 Medium' : '🔴 Hard'}
                  </button>
                ))}
              </div>
              <div className="card animate-fadeIn">
                {(leaderboard[lbTab] || []).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                    <p style={{ fontSize: '48px', marginBottom: '16px' }}>📋</p>
                    <p>No scores yet for {lbTab} mode.</p>
                    <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={goToQuiz}>Play First!</button>
                  </div>
                ) : (
                  (leaderboard[lbTab] || []).map((entry, i) => (
                    <div key={entry.sessionId} className="lb-row animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className={`lb-rank-num ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </div>
                      <div className="lb-info">
                        <div style={{ fontWeight: '700', fontSize: '15px' }}>{entry.rank}</div>
                        <div className="lb-time">
                          {entry.correctAnswers}/{entry.totalQuestions} correct • {entry.percentage}% • {new Date(entry.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="lb-score">{entry.score} pts</div>
                    </div>
                  ))
                )}
              </div>
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button className="btn btn-secondary" onClick={() => setPage('home')}>Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}