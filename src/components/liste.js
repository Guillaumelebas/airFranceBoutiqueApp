import * as React from "react";
import LittleHeader from "./little-header";
import {VolService} from "../services/vol-service";
import  Spinner  from "react-spinner-material";
const BASE_URL = 'https://intech-airfrance-api.herokuapp.com/v1';
// const BASE_URL = 'http://localhost:4545/v1';

class Liste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aeroports: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        /*VolService.getVols()
            .then(
                (vols) => this.setState({vols: vols})
            );*/
        fetch(`${BASE_URL}/aeroport`)
            .then((response) => response.json() )
            .then( (r) => {
                console.log(r);
                this.setState({aeroports: r.data, isLoading: false})} );
        // .then((response) => this.setState({vols:response.data}) );
    }

    renderLoading(){
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
            </div>
        );
    }

    render() {
        return (
            <div>
                <LittleHeader/>
                <section id="two" class="wrapper style2">
                    <div class="inner">
                        <div class="box">
                            <div class="content">
                                <header class="align-center">
                                    <p>Remplissez le formulaire et envolez vouuuuuuus !</p>
                                    <h2>Rechercher son vol</h2>
                                </header>

                                <form method="GET" action="/resultat-recherche">
                                    {this.state.isLoading ? this.renderLoading() :
                                    <div className="row uniform">
                                        <div className="6u 12u$(xsmall)">

                                            <select name="aeroportDepart" id="aeroportDepart">
                                                { this.state.aeroports.map(
                                                    (item, index) => <option value={item.idAeroport} >{item.villeAeroport}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="6u$ 12u$(xsmall)">
                                            <select name="aeroportArrivee" id="aeroportArrivee">
                                                { this.state.aeroports.map(
                                                    (item, index) => <option value={item.idAeroport} >{item.villeAeroport}</option>
                                                )}
                                            </select>
                                        </div>


                                        <div class="6u 12u$(xsmall)">
                                            Date de départ
											<input type="datetime-local" name="dateDepart" id="dateDepart"/>

                                        </div>

										<div class="6u$ 12u$(xsmall)">
                                            Date d'arrivée
											<input type="datetime-local" name="dateArrivee" id="dateArrivee" />
                                        </div>

                                        <div className="5u$ 12u$(xsmall)">
                                        <label for="passager-select">Nombre de passagers</label>
                                        <select name="nbPassager" id="nbPassager">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>

                                        </div>
                                        <div className="3u$ 12u$(small)">
                                            <input type="submit" value="Search" className="fit"/>
                                        </div>
                                    </div>
                                    }
                                </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
        );
    }
}

export default Liste;
