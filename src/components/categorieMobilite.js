import React, { Component } from "react";
import NavBeneficiaire from "./NavBeneficiaire";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DynamicCharts from "./chartsJS";
import PostDataService from "../services/post.service";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import AddDonnee from "./add-donnee.component";

class Mobilite extends Component {
  constructor(props) {
    super(props);

    this.onChangemois = this.onChangemois.bind(this);
    this.onChangevaleur = this.onChangevaleur.bind(this);

    this.saveDonnee = this.saveDonnee.bind(this);
    this.newDonnee = this.newDonnee.bind(this);

    this.state = {
      id: null,
      mois: "",
      categorie: "Mobilité",
      moisUser: "",
      valeur: "1",
      currentUser: { prenom: "", nom: "" },
      submitted: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser });
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    let date = new Date();
    let longMonth = date.toLocaleString("fr-fr", { month: "long" });
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      mois: longMonth,
    });
  }

  onChangemois(e) {
    this.setState({
      moisUser: e.target.value,
    });
  }

  onChangevaleur(e) {
    this.setState({
      valeur: e.target.value,
    });
  }

  handleChangeMonth = (e) => {
    const isShow = !this.state.isShow;
    // const mois = this.state.mois
    this.setState({ isShow, mois: e.target.value });
  };
  saveDonnee() {
    const user = { ...this.state.currentUser };
    var data = {
      mois: this.state.mois,
      valeur: this.state.valeur,
      userId: user.prenom,
      categorie: this.state.categorie,
    };

    PostDataService.create(data)
      .then((response) => {
        this.setState({
          userId: response.data.userId,
          mois: response.data.mois,
          valeur: response.data.valeur,
          published: response.data.published,
          categorie: response.data.categorieId,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newDonnee() {
    this.setState({
      id: null,
      mois: "",
      categorie: "Mobilité",
      moisUser: "",
      valeur: "",
      currentUser: { prenom: "", nom: "" },
      submitted: false,
    });
  }

  render() {
    const { currentUser } = this.state;
    let date = new Date();
    let date2 = new Date().getMonth() - 1; // 2020-06-21
    let mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    let longMonth = date.toLocaleString("fr-fr", { month: "long" });
    let beforeMonth = mois[date2];
    return (
      <div>
        <div className="row">
          <div className=" col-1">
            <NavBeneficiaire />
          </div>
          <div
            className="container-fluid col-11"
            style={{ padding: "0 2% 0 2%" }}
          >
            <div
              className="col-6"
              style={{
                borderBottom: "2px solid black",
                marginTop: "2%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2>
                Catégorie {this.state.categorie} de {currentUser.nom}{" "}
                {currentUser.prenom}{" "}
              </h2>
              <div className="d-flex  d-none d-md-block">
                <FontAwesomeIcon icon="wrench" id="icones" />
              </div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-sm-6 col-lg-8 ">
                <div
                  style={{
                    border: "1px solid black",
                    backgroundColor: "white",
                    margin: "2% 0 2% 0",
                  }}
                >
                  <DynamicCharts />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                {this.state.submitted ? (
                  <div>
                    <h4>Les données ont bien été enregistrées!</h4>
                    <button
                      className="btn btn-success"
                      onClick={this.newDonnee}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div>
                    {this.state.isShow ? (
                      <div style={{ marginTop: "2%" }}>
                        <span>
                          <h3>
                            Actualisation pour la période de : <br />{" "}
                            <strong>{beforeMonth}</strong>
                          </h3>
                        </span>
                        <span>Selectionnez le mois actuel : &nbsp;</span>
                        <button
                          onClick={this.handleChangeMonth}
                          value={longMonth}
                          onChange={this.onChangemois}
                          className="btn btn-success"
                        >
                          {longMonth}
                        </button>
                      </div>
                    ) : (
                      <div style={{ marginTop: "2%" }}>
                        <span>
                          <h3>
                            Actualisation pour la période de :{" "}
                            <strong>{longMonth}</strong>
                          </h3>
                        </span>
                        <span>Selectionnez le mois précédent : &nbsp;</span>
                        <button
                          onClick={this.handleChangeMonth}
                          value={beforeMonth}
                          className="btn btn-success"
                        >
                          {beforeMonth}
                        </button>
                      </div>
                    )}

                    <div className="input-group mb-3">
                      <label htmlFor="mois">selectionnez la valeur</label>
                      <select
                        className="form-control"
                        id="valeur"
                        value={this.state.valeur}
                        onChange={this.onChangevaleur}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button
                      onClick={this.saveDonnee}
                      className="btn btn-success"
                    >
                      Envoyer
                    </button>
                  </div>
                )}

                <div className="row">
                  <div className="col-12">{/* <Messagerie /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobilite;
