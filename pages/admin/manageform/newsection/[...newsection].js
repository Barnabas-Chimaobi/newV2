import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Chip } from 'primereact/chip';

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import Form from "@/components/form"
import { Card } from "primereact/card";
import {
    SAVE_DYNAMIC_FORM_SETUP,
    SAVE_DYNAMIC_PROGRAMME_AND_SESSION,
} from "../../../../pages/api/mutations/adminMutation";
import {
    ALL_PROGRAMME,
    GET_ALL_SESSION,
    GET_ALL_PAGES,
    GET_ALL_SET_UP_DONE
} from "../../../../pages/api/queries/basicQueries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import Spinner from "@/components/spinner";

import { Toast } from "primereact/toast";

export default function CreateSections() {

    const router = useRouter()
    const toast = useRef(null);
    const [pages, setpages] = useState([]);
    const [page, setpage] = useState("");
    const [programme, setprogramme] = useState('');
    const [availableForms, setavailableForms] = useState('');
    const [isLoading, setisLoading] = useState(true);
    return (
        <div>[...newsection]</div>
    )
}
