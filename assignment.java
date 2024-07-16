public class Baby {
    String name;
    boolean isMale;
    double weight;
    double decibels;
    int numPoops = 0;

    // Constructor
    public Baby(String name, boolean isMale, double weight, double decibels) {
        this.name = name;
        this.isMale = isMale;
        this.weight = weight;
        this.decibels = decibels;
    }

        // Setter Methods
    public void setName(String name) {
        this.name = name;
    }

    public void setMale(boolean male) {
        isMale = male;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setDecibels(double decibels) {
        this.decibels = decibels;
    }

    // Getter Methods
    public String getName() {
        System.out.println("The baby's name is " + name);
    }

    public boolean isMale() {
        if (isMale) {
            System.out.println("The baby is male");
            else {
                System.out.println("The baby is female");
            }
    }

    public double getWeight() {
        System.out.println("The baby weighs " + weight + " pounds");
    }

    public double getDecibels() {
        System.out.println("The baby cries at " + decibels + " decibels");
    }

    public int getNumPoops() {
        System.out.println("The baby has pooped " + numPoops + " times");
    }

    // Increment the number of poops by 1
    public void poop() {
        numPoops++;
    }
}