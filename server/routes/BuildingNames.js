const buildingCoordinates = {
    "Wits Dig Fields": [-26.186108662845843, 28.02409717129717],
    "Olives and Plates Wits Club": [-26.1855596536305, 28.02580864060737],
    "Wits Sturrock Park": [-26.193149117691586, 28.02114660117094],
    "Wits First Year Parking": [-26.185759196050444, 28.026829087395125],
    "Wits Barnato Hall": [-26.186898634974394, 28.025020541197684],
    "West Campus Village": [-26.187236948061074, 28.02391692959288],
    "Convocation Dining Hall": [-26.186967858452032, 28.024174757251995],
    "DJ Du Plessis Centre": [-26.18820617388234, 28.024187980261132],
    "Wits Judo Hall": [-26.188742860046933, 28.023310512075337],
    "Wits Chalsty Centre": [-26.188919612261177, 28.02504587279253],
    "Oliver Schreiner School of Law": [-26.188651543028065, 28.02516385243044],
    "Wits Law Lawns": [-26.18773383045478, 28.025381424634453],
    "Wits Law Clinic": [-26.189490375101762, 28.025396933576932],
    "2nd+ Year Parking": [-26.187510126167517, 28.026481622915306],
    "First National Bank Building": [-26.187510126167517, 28.026481622915306],
    "David Webster Hall of Residence": [-26.18670743359967, 28.02621846120744],
    "Wits Squash Courts": [-26.18624684251656, 28.02697520838784],
    "Wits Hall 29": [-26.186406278096058, 28.02619871991569],
    "Wits Commerce Library": [-26.189531826030866, 28.025787721478867],
    "Faculty of Commerce, Law and Management CLM Building": [-26.189299368258002, 28.026496584064976],
    "Wits Tower of Light": [-26.18967086296712, 28.025903417704193],
    "New Commerce Building": [-26.189717045202336, 28.026891791020024],
    "The Old Grandstand": [-26.18999568794331, 28.02597819750898],
    "Wits Plus": [-26.18976393879727, 28.02706743550855],
    "TW Kambule Mathematical Sciences Building": [-26.190075463438358, 28.026490638152453],
    "Wits Science Stadium": [-26.190584216480556, 28.02535451194505],
    "Wits CCDU": [-26.190873883643892, 28.026798367612137],
    "Wits GoldFields Laboratories": [-26.191260928357778, 28.025996875383083],
    "Wits Flower Hall": [-26.19167912164283, 28.02593674056332],
    "Wits CLTD": [-26.19207102131111, 28.02574355335392],
    "The Chamber of Mines Building": [-26.191498201903258, 28.027004191554344],
    "Origins Centre": [-26.19265452180591, 28.028512262617774],
    "Palaeoscience Centre": [-26.192941875303735, 28.02912198572682],
    "Bernard Price Building": [-26.192545894804482, 28.029201789119593],
    "Post Graduate Club": [-26.19225092449953, 28.028750318316945],
    "Wits Richard Ward Building": [-26.193116002312458, 28.02981062017749],
    "Hillman Building": [-26.192213201342785, 28.029506047086695],
    "South-West Engineering": [-26.19181022347307, 28.029397354951595],
    "Solomon Mahlangu House": [-26.192780987769574, 28.030466884270947],
    "Robert Sobukwe Block": [-26.191880245496435, 28.030496388571112],
    "Wits Great Hall": [-26.19177128088097, 28.030320583201085],
    "Wits Theatre": [-26.192858759393424, 28.031722742409464],
    "Wits Humphrey Raikes": [-26.19204580451635, 28.031288164351423],
    "Wits School Of Arts": [-26.19307344229086, 28.03238484285254],
    "Wits Chris Seabrooke Music Hall": [-26.192996675788205, 28.03243372949412],
    "The Nunnery": [-26.192645240846065, 28.032442741088875],
    "Wits Digital Arts Division": [-26.1924217747487, 28.03243428463723],
    "Wits University Corner": [-26.192764371584698, 28.03317270966182],
    "Wits Gate House": [-26.191997306716967, 28.032095637991283],
    "Oppenheimer Life Sciences": [-26.19148392816042, 28.032052728767535],
    "Wits Physics Building": [-26.191576776139485, 28.03129364263109],
    "Emthongeni Community Centre": [-26.19111668222833, 28.03201024226863],
    "Wits Biology Building": [-26.190800713053548, 28.031380128760585],
    "Umthombo Building": [-26.19051630235072, 28.031133795073877],
    "Wartenweiler Library": [-26.191043988619104, 28.030775511021737],
    "Geosciences Building": [-26.191125115358343, 28.029690290645807],
    "Wits Library Lawns": [-26.190661834986393, 28.030070713716597],
    "The Matrix": [-26.18970326669831, 28.03065654811927],
    "Sunnyside Residence": [-26.189885266561845, 28.031470741093727],
    "North West Engineering Building": [-26.191057377441457, 28.029008949004417],
    "John Moffat": [-26.189950235329185, 28.02938445824885],
    "Amphitheatre": [-26.190017790599345, 28.03006931360904],
    "Wits School of Construction Economics and Management": [-26.190339525794137, 28.02884513637451],
    "Old Mutual Sports Hall": [-26.18949764328456, 28.029279553302388],
    "Wits Swimming Pool": [-26.189869628999407, 28.030043654310052],
    "Wits Main Dining Hall": [-26.189403702135134, 28.03089565345409],
    "Jan Smuts House": [-26.190236357620755, 28.031852249006953],
    "East Campus Basketball Court": [-26.189465449404278, 28.030179146821364],
    "Wits College House": [-26.188998139578867, 28.030645000876703],
    "Mens Halls Of Residence": [-26.18902627534992, 28.029398260680807],
    "Dalrymple House": [-26.188971963712255, 28.029372318972612],
    "Wits Anglo American Digital Dome": [-26.18831391161624, 28.028174382106627],
    "Bidvest Stadium": [-26.187470380299327, 28.028544748320606],
    "Hofmeyr House": [-26.18865437330646, 28.03205276276258],
    "Wits University Jubilee Hall": [-26.188118758918577, 28.03247163019034],
    "Wits Rugby Stadium": [-26.1874139993864, 28.03130927321082],
    "International House Residence": [-26.189646395824596, 28.032462601117658],
    "The Sanctuary": [-26.188104229232977, 28.03083693990862],
    "Bozzoli Sports Pavilion": [-26.186912621398353, 28.030613662727568],
    "Wits Musallah": [-26.188219638935195, 28.029161997982705],
    "Wits Language School": [-26.186180369957345, 28.03099595184753],
    "Schonland Research Centre": [-26.18591219947479, 28.029714308700836],
    "Schonland Research and Workshops": [-26.186002134552417, 28.030191361214996],
    "iThemba LABS": [-26.18584274292112, 28.03021462013458],
    "Walter Milton Oval": [-26.187609963758945, 28.02972049808598]
};

function getCoordinates(buildingName) {
    const coordinates = buildingCoordinates[buildingName];
    if (coordinates) {
        return {
            latitude: coordinates[0],
            longitude: coordinates[1]
        };
    } else {
        return "Building not found try using full name or abbreviated"; // or you can return a message indicating the building was not found
    }
}

// const result = getCoordinates("Wits Great Hall");

// if (typeof result === "object") {
//     console.log("Coordinates:", result);
// } else if (typeof result === "string") {
//     console.log(result); // Log the error message if the building is not found
// }

module.exports = getCoordinates;

