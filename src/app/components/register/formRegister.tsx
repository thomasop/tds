import React, { useEffect, useState } from "react";
import styles from "./formRegister.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import useSWRMutation from "swr/mutation";
import { TextField } from "@mui/material";
import validator from "validator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/fr";
import fetchPost from "../fetch/user/FetchPost";

const frenchLocale =
  frFR.components.MuiLocalizationProvider.defaultProps.localeText;

const FormRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputPseudo, setInputPseudo] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [firstnameInput, setFirstnameInput] = useState<string>("");
  const [lastnameInput, setLastnameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordComfirmInput, setPasswordComfirmInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [birthInput, setBirthInput] = useState<string>("");
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validFirstnameInput, setValidFirstnameInput] =
    useState<boolean>(false);
  const [validLastnameInput, setValidLastnameInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [validPasswordComfirmInput, setValidPasswordComfirmInput] =
    useState<boolean>(false);
  const [validPhoneInput, setValidPhoneInput] = useState<boolean>(false);
  const [validBirthInput, setValidBirthInput] = useState<boolean>(false);
  const [firstnameInputError, setFirstnameInputError] = useState<string>("");
  const [lastnameInputError, setLastnameInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [passwordComfirmInputError, setPasswordComfirmError] =
    useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [phoneInputError, setPhoneInputError] = useState<string>("");
  const [birthInputError, setBirthInputError] = useState<string>("");

  const { trigger, data } = useSWRMutation("/api/user/register", fetchPost);

  useEffect(() => {
    console.log(data);
    if (data) {
      if (data.status === 200) {
        dispatch({
          type: "flash/storeFlashMessage",
          payload: { flashMessage: data.message, type: "success" },
        });
        dispatch({ type: "form/closeRegisterOpenLogin" });
      } else if (data.status === 400) {
        data.message.forEach((element: string) => {
          if (element[0] === "email") {
            setEmailInputError(element[1]);
          }
          if (element[0] === "password") {
            setPasswordInputError(element[1]);
          }
          if (element[0] === "firstname") {
            setFirstnameInputError(element[1]);
          }
          if (element[0] === "lastname") {
            setLastnameInputError(element[1]);
          }
          if (element[0] === "phone") {
            setPhoneInputError(element[1]);
          }
        });
      } else {
        dispatch({
          type: "flash/storeFlashMessage",
          payload: { flashMessage: data.message, type: "error" },
        });
      }
    }
  }, [data, dispatch]);
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      validEmailInput === true &&
      validFirstnameInput === true &&
      validLastnameInput === true &&
      validPasswordInput === true &&
      validPasswordComfirmInput === true &&
      validPhoneInput === true &&
      validBirthInput === true
    ) {
      if (inputPseudo.length === 0) {
        const fetchRegister = async () => {
          trigger({
            email: validator.escape(emailInput.trim()),
            password: validator.escape(passwordInput.trim()),
            firstname: validator.escape(firstnameInput.trim()),
            lastname: validator.escape(lastnameInput.trim()),
            phone: validator.escape(phoneInput.trim()),
            birth: dayjs(birthInput).format("YYYY-MM-DD"),
            pseudo: validator.escape(inputPseudo.trim()),
          });
        };
        fetchRegister();
      }
    } else {
      if (validEmailInput === false) {
        setEmailInputError("Email : doit avoir un format valide");
      }
      if (validFirstnameInput === false) {
        setFirstnameInputError("Prénom : 3 lettres minimum");
      }
      if (validLastnameInput === false) {
        setLastnameInputError("Nom de famille : 3 lettres minimum");
      }
      if (validPasswordInput === false) {
        setPasswordInputError(
          "Mot de passe : doit avoir une lettre en minuscule, un nombre et 8 caractères minimum"
        );
      }
      if (validPasswordComfirmInput === false) {
        setPasswordComfirmError(
          "Comfirmation mot de passe : doit être identique au mot de passe"
        );
      }
      if (validPhoneInput === false) {
        setPhoneInputError(
          "Téléphone : doit être une numéro de téléphone valide commençant par 06 or 07"
        );
      }
      if (validBirthInput === false) {
        setBirthInputError(
          "Date de naissance : vous devez être majeur pour vous inscrire"
        );
      }
    }
  };

  const handlerInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    regex: RegExp,
    setValidInput: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    let removeSpace = "";
    if (e.target.value.charAt(0) === " ") {
      removeSpace = e.target.value.replace(/\s/, "");
      setInput(removeSpace);
    } else {
      removeSpace = e.target.value.replace(/\s\s+/g, " ");
      setInput(removeSpace);
    }

    if (regex.test(removeSpace)) {
      setValidInput(true);
      setErrorMessage("");
    } else if (removeSpace.length === 0) {
      setValidInput(false);
      setErrorMessage("");
    } else {
      setValidInput(false);
      setErrorMessage(errorMessage);
    }
  };
  const handlerInputPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    regex: RegExp,
    setValidInput: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    let removeSpace = "";
    if (e.target.value.charAt(0) === " ") {
      removeSpace = e.target.value.replace(/\s/, "");
      setInput(removeSpace);
    } else {
      removeSpace = e.target.value.replace(/\s+/g, "");
      setInput(removeSpace);
    }
    setInput(removeSpace);
    if (regex.test(removeSpace)) {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(true);
        setErrorMessage("");
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(true);
        setErrorMessage("");
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    } else if (removeSpace.length === 0) {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(false);
        setErrorMessage("");
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(false);
        setErrorMessage("");
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    } else {
      if (
        passwordComfirmInput.length > 0 &&
        removeSpace !== passwordComfirmInput
      ) {
        setValidInput(false);
        setErrorMessage(errorMessage);
        setPasswordComfirmError(
          "Comfirmation mot de passe : les mots de passe doivent être identique"
        );
        setValidPasswordComfirmInput(false);
      } else {
        setValidInput(false);
        setErrorMessage(errorMessage);
        setPasswordComfirmError("");
        setValidPasswordComfirmInput(true);
      }
    }
  };

  const handlerInputBirth = (e: any) => {
    let currentDate = new Date();
    let limiteDate = currentDate.setFullYear(currentDate.getFullYear() - 18);
    if (!e) {
      setValidBirthInput(false);
      setBirthInputError("Date de naissance : doit avoir le format jj/mm/aaaa");
    } else {
      setBirthInput(e.$d);
      let choiceDate = new Date(e.$d);
      if (choiceDate instanceof Date === false || isNaN(e.$d)) {
        setValidBirthInput(false);
        setBirthInputError(
          "Date de naissance : doit avoir le format jj/mm/aaaa"
        );
      } else if (choiceDate.getTime() > new Date(limiteDate).getTime()) {
        setValidBirthInput(false);
        setBirthInputError(
          "Date de naissance : vous devez être majeur pour vous inscrire"
        );
      } else {
        setBirthInput(e.$d);
        setValidBirthInput(true);
        setBirthInputError("");
      }
    }
  };

  return (
    <>
      <div className={styles.register}>
        <div className={styles.register__top}>
          <button
            className={styles.register__top__back}
            onClick={() => {
              dispatch({ type: "form/closeRegisterOpenLogin" });
            }}
          >
            Retour à la connection
          </button>
          <button
            className={styles.register__top__close}
            onClick={() => dispatch({ type: "form/toggleRegister" })}
          >
            <span className={styles.register__top__close__cross}>&times;</span>
          </button>
        </div>

        <h1 className={styles.register__h1}>Création de compte</h1>
        <form
          className={styles.register__form}
          action=""
          onSubmit={(e) => {
            handlerSubmit(e);
          }}
        >
          <TextField
            autoFocus
            value={firstnameInput}
            style={{ margin: "10px 0px" }}
            id={"firstname"}
            label={"Prénom"}
            variant="standard"
            type={"text"}
            placeholder={"Entrez votre prénom"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              handlerInput(
                e,
                /^[A-Za-z][A-Za-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi ]{2,}$/,
                setValidFirstnameInput,
                setFirstnameInputError,
                setFirstnameInput,
                "Prénom : 3 lettres minimum"
              );
            }}
            helperText={firstnameInputError}
          />
          <TextField
            value={lastnameInput}
            style={{ margin: "10px 0px" }}
            id={"lastname"}
            label={"Nom de famille"}
            variant="standard"
            type={"text"}
            placeholder={"Entrez votre nom de famille"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              handlerInput(
                e,
                /^[A-Za-z][A-Za-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi ]{2,}$/,
                setValidLastnameInput,
                setLastnameInputError,
                setLastnameInput,
                "Nom de famille : 3 lettres minimum"
              );
            }}
            helperText={lastnameInputError}
          />
          <TextField
            value={passwordInput}
            style={{ margin: "10px 0px" }}
            id={"password"}
            label={"Mot de passe"}
            variant="standard"
            type={"password"}
            placeholder={"Entrez votre mot de passe"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              handlerInputPassword(
                e,
                /^(?=.*[a-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi]).{1,}$/,
                setValidPasswordInput,
                setPasswordInputError,
                setPasswordInput,
                "Mot de passe : doit avoir une lettre ne minuscule, un nombre et 8 caractères minimum"
              );
            }}
            helperText={passwordInputError}
          />
          <TextField
            value={passwordComfirmInput}
            style={{ margin: "10px 0px" }}
            id={"passwordComfirm"}
            label={"Comfirmation mot de passe"}
            variant="standard"
            type={"password"}
            placeholder={"Entrez comfirmation de votre mot de passe"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              let removeSpace = "";
              if (e.target.value.charAt(0) === " ") {
                removeSpace = e.target.value.replace(/\s/, "");
                setPasswordComfirmInput(removeSpace);
              } else {
                removeSpace = e.target.value.replace(/\s+/g, "");
                setPasswordComfirmInput(removeSpace);
              }
              if (passwordInput.length > 0 && removeSpace !== passwordInput) {
                setValidPasswordComfirmInput(false);
                setPasswordComfirmError(
                  "Comfirmation mot de passe : les mots de passe doivent être identique"
                );
              } else {
                setValidPasswordComfirmInput(true);

                setPasswordComfirmError("");
              }
            }}
            helperText={passwordComfirmInputError}
          />
          <TextField
            value={emailInput}
            style={{ margin: "10px 0px" }}
            id={"email"}
            label={"Email"}
            variant="standard"
            type={"text"}
            placeholder={"Entrez votre email"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              handlerInput(
                e,
                /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/,
                setValidEmailInput,
                setEmailInputError,
                setEmailInput,
                "Email : doit être un email valide"
              );
            }}
            helperText={emailInputError}
          />
          <TextField
            value={phoneInput}
            style={{ margin: "10px 0px" }}
            id={"phone"}
            label={"Téléphone"}
            variant="standard"
            type={"tel"}
            placeholder={"Entrez votre numéro de téléphone"}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={(e) => {
              handlerInput(
                e,
                /^[0](6|7)[0-9]{8,8}$/,
                setValidPhoneInput,
                setPhoneInputError,
                setPhoneInput,
                "Téléphone : doit être une numéro de téléphone valide commençant par 06 or 07"
              );
            }}
            helperText={phoneInputError}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="fr"
            localeText={frenchLocale}
          >
            <DatePicker
              slotProps={{
                textField: { variant: "standard", helperText: birthInputError },
              }}
              label="Date de naissance"
              onChange={(e: any) => {
                handlerInputBirth(e);
              }}
            />
          </LocalizationProvider>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => {
              setInputPseudo(e.target.value);
            }}
          />
          <div className={styles.register__form__submit}>
            <input
              className={styles.register__form__submit__btn}
              type="submit"
              value="S'inscrire"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormRegister;

// /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
