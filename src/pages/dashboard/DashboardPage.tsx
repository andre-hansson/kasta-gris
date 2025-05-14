import { Button } from "@/components/ui/button";

export const DashboardPage = () => {
    return (
        <div>
            <h1>Kasta gris</h1>
            <p>Fett kul med kasta gris!</p>
            <Button variant="default" onClick={() => alert('Not implemented')}>Start ny omgång</Button>
        </div>
    );
}