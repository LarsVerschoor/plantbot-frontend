import Button from "../Components/Button.jsx";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Contexts/Auth.jsx";
const URL = import.meta.env.VITE_BACKEND_URL

const Connect = function () {
    const {token} = useContext(AuthContext);

    const [characteristics, setCharacteristics] = useState(null);
    const [formData, setFormData] = useState({
        ssid: '',
        password: ''
    });
    const [connectUUID, setConnectUUID] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${URL}/connect-uuid`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const uuid = data?.uuid ?? null;
                setConnectUUID(uuid);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleNotification = (event) => {
        console.log('receive!');
        const value = new TextDecoder('utf-8').decode(event.target.value);
        console.log('Received:', value);
    }

    const handleBluetoothConnect = async () => {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ["12345678-1234-5678-1234-56789abcdef0"] }]
        });

        const server = await device.gatt.connect();

        const service = await server.getPrimaryService("12345678-1234-5678-1234-56789abcdef0");
        const characteristics = {
            ssid: await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef1"),
            password: await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef2"),
            connectUUID: await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef3"),
            notifications: await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef4")
        }

        characteristics.notifications.startNotifications();
        characteristics.notifications.addEventListener('characteristicvaluechanged', handleNotification);

        setCharacteristics(characteristics);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const sendData = async (characteristic, data) => {
        const encoder = new TextEncoder('utf-8');
        await characteristic.writeValue(encoder.encode(data));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { ssid, password } = formData;
        await sendData(characteristics.ssid, ssid);
        await sendData(characteristics.password, password);
        await sendData(characteristics.connectUUID, connectUUID)
        alert('WiFi credentials sent over Bluetooth')
    }

    return (

        !connectUUID ? <div>Loading...</div> :
            <>
                <h1>Connect your PlantBot</h1>

                <h2>Step 1: Power your PlantBot.</h2>
                <h2>Step 2: Keep this device close to your PlantBot.</h2>
                <h2>Step 3: Select your plantbot from this list.</h2>
                <Button type="button" onClick={handleBluetoothConnect}>Select your PlantBot</Button>
                {
                    characteristics &&
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="ssid">WiFi SSID</label>
                            <input type="text" id="ssid" name="ssid" value={formData.ssid}
                                   onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">WiFi password</label>
                            <input type="password" id="password" name="password" value={formData.password}
                                   onChange={handleInputChange}/>
                        </div>
                        <Button type="submit">Finish connecting your PlantBot!</Button>
                    </form>
                }
            </>

    );
}

export default Connect;