async function getTotalStakedAtom() {
    const addressesText = document.getElementById('addresses').value;
    const addresses = addressesText.split('\n').map(addr => addr.trim()).filter(addr => addr);

    let totalStakedAtom = 0;
    const apiBase = 'https://docs-demo.cosmos-mainnet.quiknode.pro/cosmos/staking/v1beta1/delegations/';

    for (let address of addresses) {
        try {
            const response = await fetch(`${apiBase}${address}`);
            if (response.ok) {
                const data = await response.json();
                for (let delegation of data.delegation_responses) {
                    totalStakedAtom += parseInt(delegation.balance.amount) / 1e6; // Chuyển đổi từ uatom sang ATOM
                }
            } else {
                console.error(`Error fetching data for address: ${address}`);
            }
        } catch (error) {
            console.error(`Error fetching data for address: ${address}`, error);
        }
    }

    document.getElementById('result').innerText = `Tổng số ATOM đang stake: ${totalStakedAtom}`;
}
